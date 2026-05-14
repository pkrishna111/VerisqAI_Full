namespace VerisqAI.API.DTOs.Vendor
{
    public class VendorDetailsDto
    {
        public VendorInfoDto Vendor { get; set; }

        public AssessmentDto Assessment { get; set; }
    }

    public class VendorInfoDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Domain { get; set; }

        public string Email { get; set; }

        public string Status { get; set; }
    }

    public class AssessmentDto
    {
        public QuestionnaireDto Questionnaire { get; set; }

        public ScorecardDto Scorecard { get; set; }

        public List<FindingDto> Findings { get; set; } = new();

        public List<ResponseDto> Responses { get; set; } = new();
    }

    public class QuestionnaireDto
    {
        public int Id { get; set; }

        public string Status { get; set; }

        public DateTime SentAt { get; set; }

        public DateTime? CompletedAt { get; set; }
    }

    public class ScorecardDto
    {
        public int Id { get; set; }

        public int? Score { get; set; }

        public int? RiskScore { get; set; }

        public int? RiskTier { get; set; }

        public DateTime CreatedAt { get; set; }
    }

    public class FindingDto
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string Severity { get; set; }
    }

    public class ResponseDto
    {
        public string Question { get; set; }

        public string Answer { get; set; }
    }

}
