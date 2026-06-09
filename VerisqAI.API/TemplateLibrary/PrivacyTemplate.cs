namespace VerisqAI.API.TemplateLibrary
{
    public static class PrivacyTemplate
    {
        public static TemplateDefinition Build()
        {
            return new TemplateDefinition
            {
                Key = "privacy-assessment",

                Name = "Privacy Assessment",

                Description =
                    "Assessment of privacy, consent management, retention and regulatory compliance controls.",

                Version = "1",

                Sections = new()
                {
                    BuildDataCollection(),
                    BuildConsentManagement(),
                    BuildDataRetention(),
                    BuildRegulatoryCompliance()
                }
            };
        }

        private static SectionDefinition BuildDataCollection()
        {
            return new SectionDefinition
            {
                Title = "Data Collection",

                Description =
                    "Collection and processing of personal information.",

                Questions = new()
                {
                    new QuestionDefinition
                    {
                        QuestionText =
                            "Do you document the categories of personal data collected?",
                        QuestionType = "YesNo",
                        Category = "Data Collection",
                        Severity = "High",
                        Weight = 7,
                        Options = new()
                        {
                            new OptionDefinition
                            {
                                OptionText = "Yes",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "No"
                            }
                        }
                    },

                    new QuestionDefinition
                    {
                        QuestionText =
                            "Which types of personal data are collected?",
                        QuestionType = "MultiSelect",
                        Category = "Data Collection",
                        Severity = "Medium",
                        Weight = 3,
                        Options = new()
                        {
                            new OptionDefinition
                            {
                                OptionText = "Contact Information",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "Identifiers",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "Financial Information"
                            },
                            new OptionDefinition
                            {
                                OptionText = "Health Information"
                            }
                        }
                    },

                    new QuestionDefinition
                    {
                        QuestionText =
                            "What is the primary lawful basis for processing personal data?",
                        QuestionType = "SingleSelect",
                        Category = "Data Collection",
                        Severity = "High",
                        Weight = 7,
                        Options = new()
                        {
                            new OptionDefinition
                            {
                                OptionText = "Consent",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "Contract"
                            },
                            new OptionDefinition
                            {
                                OptionText = "Legal Obligation"
                            },
                            new OptionDefinition
                            {
                                OptionText = "Not Defined"
                            }
                        }
                    }
                }
            };
        }

        private static SectionDefinition BuildConsentManagement()
        {
            return new SectionDefinition
            {
                Title = "Consent Management",

                Description =
                    "User consent collection and management controls.",

                Questions = new()
                {
                    new QuestionDefinition
                    {
                        QuestionText =
                            "Is user consent explicitly obtained before collecting personal data?",
                        QuestionType = "YesNo",
                        Category = "Consent Management",
                        Severity = "Critical",
                        Weight = 10,
                        Options = new()
                        {
                            new OptionDefinition
                            {
                                OptionText = "Yes",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "No"
                            }
                        }
                    },

                    new QuestionDefinition
                    {
                        QuestionText =
                            "Which consent management capabilities are implemented?",
                        QuestionType = "MultiSelect",
                        Category = "Consent Management",
                        Severity = "Critical",
                        Weight = 10,
                        Options = new()
                        {
                            new OptionDefinition
                            {
                                OptionText = "Consent Tracking",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "Consent Withdrawal",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "Consent Audit Trail",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "None"
                            }
                        }
                    },

                    new QuestionDefinition
                    {
                        QuestionText =
                            "How is consent recorded?",
                        QuestionType = "SingleSelect",
                        Category = "Consent Management",
                        Severity = "Medium",
                        Weight = 3,
                        Options = new()
                        {
                            new OptionDefinition
                            {
                                OptionText = "Automated System",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "Manual Records"
                            },
                            new OptionDefinition
                            {
                                OptionText = "Not Recorded"
                            }
                        }
                    }
                }
            };
        }

        private static SectionDefinition BuildDataRetention()
        {
            return new SectionDefinition
            {
                Title = "Data Retention",

                Description =
                    "Retention and disposal controls.",

                Questions = new()
                {
                    new QuestionDefinition
                    {
                        QuestionText =
                            "Do you maintain documented data retention schedules?",
                        QuestionType = "YesNo",
                        Category = "Data Retention",
                        Severity = "High",
                        Weight = 7,
                        Options = new()
                        {
                            new OptionDefinition
                            {
                                OptionText = "Yes",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "No"
                            }
                        }
                    },

                    new QuestionDefinition
                    {
                        QuestionText =
                            "How are expired records disposed?",
                        QuestionType = "SingleSelect",
                        Category = "Data Retention",
                        Severity = "High",
                        Weight = 7,
                        Options = new()
                        {
                            new OptionDefinition
                            {
                                OptionText = "Secure Deletion",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "Manual Deletion"
                            },
                            new OptionDefinition
                            {
                                OptionText = "No Defined Process"
                            }
                        }
                    },

                    new QuestionDefinition
                    {
                        QuestionText =
                            "Which retention governance controls exist?",
                        QuestionType = "MultiSelect",
                        Category = "Data Retention",
                        Severity = "Medium",
                        Weight = 3,
                        Options = new()
                        {
                            new OptionDefinition
                            {
                                OptionText = "Retention Schedule",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "Legal Hold Process",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "Periodic Reviews",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "None"
                            }
                        }
                    }
                }
            };
        }

        private static SectionDefinition BuildRegulatoryCompliance()
        {
            return new SectionDefinition
            {
                Title = "Regulatory Compliance",

                Description =
                    "Privacy regulation compliance controls.",

                Questions = new()
                {
                    new QuestionDefinition
                    {
                        QuestionText =
                            "Which privacy regulations are applicable?",
                        QuestionType = "MultiSelect",
                        Category = "Regulatory Compliance",
                        Severity = "High",
                        Weight = 7,
                        Options = new()
                        {
                            new OptionDefinition
                            {
                                OptionText = "GDPR",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "CCPA",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "DPDP"
                            },
                            new OptionDefinition
                            {
                                OptionText = "None"
                            }
                        }
                    },

                    new QuestionDefinition
                    {
                        QuestionText =
                            "Do you support data subject access requests?",
                        QuestionType = "YesNo",
                        Category = "Regulatory Compliance",
                        Severity = "Critical",
                        Weight = 10,
                        Options = new()
                        {
                            new OptionDefinition
                            {
                                OptionText = "Yes",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "No"
                            }
                        }
                    },

                    new QuestionDefinition
                    {
                        QuestionText =
                            "How are privacy compliance reviews conducted?",
                        QuestionType = "SingleSelect",
                        Category = "Regulatory Compliance",
                        Severity = "Medium",
                        Weight = 3,
                        Options = new()
                        {
                            new OptionDefinition
                            {
                                OptionText = "Annual Formal Review",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "Ad Hoc"
                            },
                            new OptionDefinition
                            {
                                OptionText = "No Review Process"
                            }
                        }
                    }
                }
            };
        }
    }
}