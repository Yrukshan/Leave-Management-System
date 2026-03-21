package routes

import (
	"leave-system/controllers"
	"leave-system/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {

	// Public routes
	r.POST("/register", controllers.Register)
	r.POST("/login", controllers.Login)

	// Users
	r.GET("/users", controllers.GetUsers)

	r.PUT("/users/:id", controllers.UpdateUser)
	r.DELETE("/users/:id", controllers.DeleteUser)

	// Leaves (Protected)
	leaves := r.Group("/leaves")
	leaves.Use(middleware.AuthMiddleware())

	leaves.POST("", controllers.CreateLeave)
	leaves.GET("", controllers.GetLeaves)
	leaves.GET("/search", controllers.SearchLeaves)
	leaves.PUT("/:id", controllers.UpdateLeave)
	leaves.DELETE("/:id", controllers.DeleteLeave)
	r.GET("/leaves/my", middleware.AuthMiddleware(), controllers.GetLeavesByUserID)

	// Admin routes
	admin := r.Group("/admin")
	admin.Use(middleware.AuthMiddleware())

	admin.PUT("/approve/:id", controllers.ApproveLeave)
	admin.PUT("/reject/:id", controllers.RejectLeave)
}
