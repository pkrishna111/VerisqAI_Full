namespace VerisqAI.DTOs.Admin
{
    public class AdminDashboardDto
    {
        public int TotalUsers { get; set; }
        public int ActiveUsers { get; set; }
        public int PendingUsers { get; set; }
        public int TotalVendors { get; set; }
        public int CompletedAssessments { get; set; }
        public int RiskAlerts { get; set; }

        public List<UserGrowthDto> UserGrowth { get; set; } = new();

        public List<RiskDistributionDto> RiskDistribution { get; set; } = new();

        public List<AssessmentActivityDto> AssessmentActivity { get; set; } = new();

        public List<RecentActivityDto> RecentActivities { get; set; } = new();

        public SystemHealthDto SystemHealth { get; set; } = new();
    }
}