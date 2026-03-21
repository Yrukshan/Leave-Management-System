package controllers

import (
	"net/http"

	"leave-system/database"
	"leave-system/models"
	"leave-system/utils"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func Register(c *gin.Context) {
	var user models.User

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}

	hash, _ := bcrypt.GenerateFromPassword([]byte(user.Password), 10)

	query := `INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,$4)`
	_, err := database.DB.Exec(query, user.Name, user.Email, string(hash), user.Role)

	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
		return
	}

	c.JSON(http.StatusOK, "User created")
}

func Login(c *gin.Context) {
	var input models.User

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, err)
		return
	}

	var user models.User

	err := database.DB.QueryRow("SELECT id,password,role FROM users WHERE email=$1", input.Email).
		Scan(&user.ID, &user.Password, &user.Role)

	if err != nil {
		c.JSON(http.StatusUnauthorized, "Invalid credentials")
		return
	}

	if bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)) != nil {
		c.JSON(http.StatusUnauthorized, "Invalid credentials")
		return
	}

	token, _ := utils.GenerateToken(user.ID, user.Role)

	c.JSON(http.StatusOK, gin.H{"token": token, "role": user.Role})
}

func GetUsers(c *gin.Context) {
	rows, _ := database.DB.Query("SELECT id,name,email,role FROM users")

	var users []models.User

	for rows.Next() {
		var u models.User
		rows.Scan(&u.ID, &u.Name, &u.Email, &u.Role)
		users = append(users, u)
	}

	c.JSON(http.StatusOK, users)
}

func UpdateUser(c *gin.Context) {
	id := c.Param("id")

	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(400, err)
		return
	}

	_, err := database.DB.Exec(
		"UPDATE users SET name=$1, email=$2, role=$3 WHERE id=$4",
		user.Name, user.Email, user.Role, id,
	)

	if err != nil {
		c.JSON(500, err)
		return
	}

	c.JSON(200, "User updated")
}

func DeleteUser(c *gin.Context) {
	id := c.Param("id")

	_, err := database.DB.Exec("DELETE FROM users WHERE id=$1", id)

	if err != nil {
		c.JSON(500, err)
		return
	}

	c.JSON(200, "User deleted")
}
