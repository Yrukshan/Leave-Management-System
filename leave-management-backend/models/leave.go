package models

import "time"

type Leave struct {
	ID         int       `json:"id"`
	UserID     int       `json:"user_id"`
	LeaveType  string    `json:"leave_type"`
	FromDate   time.Time `json:"from_date"`
	ToDate     time.Time `json:"to_date"`
	Reason     string    `json:"reason"`
	Status     string    `json:"status"`
	ApprovedBy int       `json:"approved_by"`
}
