namespace VerisqAI.API.TemplateLibrary
{
    public static class CloudSecurityTemplate
    {
        public static TemplateDefinition Build()
        {
            return new TemplateDefinition
            {
                Key = "cloud-security",

                Name = "Cloud Security Assessment",

                Description =
                    "Assessment of cloud infrastructure, IAM, encryption and monitoring controls.",

                Version = 1,

                Sections = new()
                {
                    BuildInfrastructureSecurity(),
                    BuildIdentityAndAccessManagement(),
                    BuildEncryption(),
                    BuildLoggingAndMonitoring()
                }
            };
        }

        private static SectionDefinition BuildInfrastructureSecurity()
        {
            return new SectionDefinition
            {
                Title = "Infrastructure Security",

                Description =
                    "Cloud infrastructure hardening and protection controls.",

                Questions = new()
                {
                    new QuestionDefinition
                    {
                        QuestionText =
                            "Which cloud providers are used?",
                        QuestionType = "MultiSelect",
                        Category = "Infrastructure Security",
                        Severity = "Medium",
                        Weight = 3,
                        Options = new()
                        {
                            new OptionDefinition { OptionText = "AWS", IsPreferredAnswer = true },
                            new OptionDefinition { OptionText = "Azure", IsPreferredAnswer = true },
                            new OptionDefinition { OptionText = "Google Cloud", IsPreferredAnswer = true },
                            new OptionDefinition { OptionText = "Other" }
                        }
                    },

                    new QuestionDefinition
                    {
                        QuestionText =
                            "Are infrastructure configurations reviewed regularly?",
                        QuestionType = "YesNo",
                        Category = "Infrastructure Security",
                        Severity = "High",
                        Weight = 7,
                        Options = new()
                        {
                            new OptionDefinition { OptionText = "Yes", IsPreferredAnswer = true },
                            new OptionDefinition { OptionText = "No" }
                        }
                    },

                    new QuestionDefinition
                    {
                        QuestionText =
                            "Which infrastructure protection controls are implemented?",
                        QuestionType = "MultiSelect",
                        Category = "Infrastructure Security",
                        Severity = "High",
                        Weight = 7,
                        Options = new()
                        {
                            new OptionDefinition { OptionText = "WAF", IsPreferredAnswer = true },
                            new OptionDefinition { OptionText = "DDoS Protection", IsPreferredAnswer = true },
                            new OptionDefinition { OptionText = "Network Segmentation", IsPreferredAnswer = true },
                            new OptionDefinition { OptionText = "None" }
                        }
                    }
                }
            };
        }

        private static SectionDefinition BuildIdentityAndAccessManagement()
        {
            return new SectionDefinition
            {
                Title = "Identity & Access Management",

                Description =
                    "Cloud IAM controls.",

                Questions = new()
                {
                    new QuestionDefinition
                    {
                        QuestionText =
                            "Is MFA required for cloud administrators?",
                        QuestionType = "YesNo",
                        Category = "IAM",
                        Severity = "Critical",
                        Weight = 10,
                        Options = new()
                        {
                            new OptionDefinition { OptionText = "Yes", IsPreferredAnswer = true },
                            new OptionDefinition { OptionText = "No" }
                        }
                    },

                    new QuestionDefinition
                    {
                        QuestionText =
                            "Which IAM capabilities are implemented?",
                        QuestionType = "MultiSelect",
                        Category = "IAM",
                        Severity = "Critical",
                        Weight = 10,
                        Options = new()
                        {
                            new OptionDefinition { OptionText = "Role Based Access Control", IsPreferredAnswer = true },
                            new OptionDefinition { OptionText = "Least Privilege", IsPreferredAnswer = true },
                            new OptionDefinition { OptionText = "Privileged Access Reviews", IsPreferredAnswer = true },
                            new OptionDefinition { OptionText = "None" }
                        }
                    },

                    new QuestionDefinition
                    {
                        QuestionText =
                            "How often are privileged cloud accounts reviewed?",
                        QuestionType = "SingleSelect",
                        Category = "IAM",
                        Severity = "High",
                        Weight = 7,
                        Options = new()
                        {
                            new OptionDefinition { OptionText = "Quarterly", IsPreferredAnswer = true },
                            new OptionDefinition { OptionText = "Annually" },
                            new OptionDefinition { OptionText = "Ad Hoc" },
                            new OptionDefinition { OptionText = "Never" }
                        }
                    }
                }
            };
        }

        private static SectionDefinition BuildEncryption()
        {
            return new SectionDefinition
            {
                Title = "Encryption",

                Description =
                    "Cloud encryption controls.",

                Questions = new()
                {
                    new QuestionDefinition
                    {
                        QuestionText =
                            "How is cloud data encrypted at rest?",
                        QuestionType = "SingleSelect",
                        Category = "Encryption",
                        Severity = "Critical",
                        Weight = 10,
                        Options = new()
                        {
                            new OptionDefinition { OptionText = "AES-256", IsPreferredAnswer = true },
                            new OptionDefinition { OptionText = "AES-128" },
                            new OptionDefinition { OptionText = "Partial Encryption" },
                            new OptionDefinition { OptionText = "Not Encrypted" }
                        }
                    },

                    new QuestionDefinition
                    {
                        QuestionText =
                            "How is cloud data encrypted in transit?",
                        QuestionType = "SingleSelect",
                        Category = "Encryption",
                        Severity = "Critical",
                        Weight = 10,
                        Options = new()
                        {
                            new OptionDefinition { OptionText = "TLS 1.3", IsPreferredAnswer = true },
                            new OptionDefinition { OptionText = "TLS 1.2", IsPreferredAnswer = true },
                            new OptionDefinition { OptionText = "SSL" },
                            new OptionDefinition { OptionText = "Not Encrypted" }
                        }
                    },

                    new QuestionDefinition
                    {
                        QuestionText =
                            "Which key management capabilities exist?",
                        QuestionType = "MultiSelect",
                        Category = "Encryption",
                        Severity = "High",
                        Weight = 7,
                        Options = new()
                        {
                            new OptionDefinition { OptionText = "KMS", IsPreferredAnswer = true },
                            new OptionDefinition { OptionText = "Key Rotation", IsPreferredAnswer = true },
                            new OptionDefinition { OptionText = "HSM", IsPreferredAnswer = true },
                            new OptionDefinition { OptionText = "None" }
                        }
                    }
                }
            };
        }

        private static SectionDefinition BuildLoggingAndMonitoring()
        {
            return new SectionDefinition
            {
                Title = "Logging & Monitoring",

                Description =
                    "Cloud monitoring and visibility controls.",

                Questions = new()
                {
                    new QuestionDefinition
                    {
                        QuestionText =
                            "Which monitoring capabilities are implemented?",
                        QuestionType = "MultiSelect",
                        Category = "Monitoring",
                        Severity = "High",
                        Weight = 7,
                        Options = new()
                        {
                            new OptionDefinition { OptionText = "SIEM", IsPreferredAnswer = true },
                            new OptionDefinition { OptionText = "Centralized Logging", IsPreferredAnswer = true },
                            new OptionDefinition { OptionText = "Real-time Alerts", IsPreferredAnswer = true },
                            new OptionDefinition { OptionText = "None" }
                        }
                    },

                    new QuestionDefinition
                    {
                        QuestionText =
                            "How long are logs retained?",
                        QuestionType = "SingleSelect",
                        Category = "Monitoring",
                        Severity = "Medium",
                        Weight = 3,
                        Options = new()
                        {
                            new OptionDefinition { OptionText = "12+ Months", IsPreferredAnswer = true },
                            new OptionDefinition { OptionText = "6 Months" },
                            new OptionDefinition { OptionText = "3 Months" },
                            new OptionDefinition { OptionText = "< 3 Months" }
                        }
                    },

                    new QuestionDefinition
                    {
                        QuestionText =
                            "Are security alerts reviewed continuously?",
                        QuestionType = "YesNo",
                        Category = "Monitoring",
                        Severity = "High",
                        Weight = 7,
                        Options = new()
                        {
                            new OptionDefinition { OptionText = "Yes", IsPreferredAnswer = true },
                            new OptionDefinition { OptionText = "No" }
                        }
                    }
                }
            };
        }
    }
}