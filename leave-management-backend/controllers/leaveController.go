package controllers

import (
	"leave-system/database"
	"leave-system/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func CreateLeave(c *gin.Context) {
	var leave models.Leave

	userID := c.GetInt("user_id")

	if err := c.ShouldBindJSON(&leave); err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}

	query := `INSERT INTO leaves(user_id,leave_type,from_date,to_date,reason) 
	          VALUES($1,$2,$3,$4,$5)`

	_, err := database.DB.Exec(
		query,
		userID,
		leave.LeaveType,
		leave.FromDate, // now receives ISO string
		leave.ToDate,
		leave.Reason,
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
		return
	}

	c.JSON(http.StatusOK, "Leave requested")
}

func GetLeaves(c *gin.Context) {
	status := c.Query("status")
	userID := c.Query("user_id")

	query := "SELECT id,user_id,leave_type,from_date,to_date,reason,status FROM leaves WHERE 1=1"

	var args []interface{}

	if status != "" {
		query += " AND status=$1"
		args = append(args, status)
	}

	if userID != "" {
		query += " AND user_id=$2"
		args = append(args, userID)
	}

	rows, _ := database.DB.Query(query, args...)

	var leaves []models.Leave

	for rows.Next() {
		var l models.Leave
		rows.Scan(&l.ID, &l.UserID, &l.LeaveType, &l.FromDate, &l.ToDate, &l.Reason, &l.Status)
		leaves = append(leaves, l)
	}

	c.JSON(http.StatusOK, leaves)
}

func SearchLeaves(c *gin.Context) {
	q := c.Query("q")

	rows, _ := database.DB.Query(`
		SELECT id,user_id,leave_type,status 
		FROM leaves 
		WHERE leave_type ILIKE '%' || $1 || '%' 
		OR reason ILIKE '%' || $1 || '%'
	`, q)

	var leaves []models.Leave

	for rows.Next() {
		var l models.Leave
		rows.Scan(&l.ID, &l.UserID, &l.LeaveType, &l.Status)
		leaves = append(leaves, l)
	}

	c.JSON(http.StatusOK, leaves)
}

func UpdateLeave(c *gin.Context) {
	id := c.Param("id")

	var leave models.Leave

	if err := c.ShouldBindJSON(&leave); err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}

	query := `UPDATE leaves SET leave_type=$1, from_date=$2, to_date=$3, reason=$4 WHERE id=$5`

	_, err := database.DB.Exec(query, leave.LeaveType, leave.FromDate, leave.ToDate, leave.Reason, id)

	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
		return
	}

	c.JSON(http.StatusOK, "Updated")
}

func DeleteLeave(c *gin.Context) {
	id := c.Param("id")

	_, err := database.DB.Exec("DELETE FROM leaves WHERE id=$1", id)

	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
		return
	}

	c.JSON(http.StatusOK, "Deleted")
}

func ApproveLeave(c *gin.Context) {
	id := c.Param("id")
	adminID := c.GetInt("user_id")

	_, err := database.DB.Exec(
		"UPDATE leaves SET status='approved', approved_by=$1 WHERE id=$2",
		adminID, id,
	)

	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, "Approved")
}

func RejectLeave(c *gin.Context) {
	id := c.Param("id")

	_, err := database.DB.Exec(
		"UPDATE leaves SET status='rejected' WHERE id=$1",
		id,
	)

	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, "Rejected")
}

func GetLeavesByUserID(c *gin.Context) {
	userID := c.GetInt("user_id") // from JWT middleware

	rows, err := database.DB.Query(`
		SELECT id,user_id,leave_type,from_date,to_date,reason,status 
		FROM leaves 
		WHERE user_id=$1
	`, userID)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	var leaves []models.Leave

	for rows.Next() {
		var l models.Leave
		rows.Scan(&l.ID, &l.UserID, &l.LeaveType, &l.FromDate, &l.ToDate, &l.Reason, &l.Status)
		leaves = append(leaves, l)
	}

	c.JSON(http.StatusOK, leaves)
}
