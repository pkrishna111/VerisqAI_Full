namespace VerisqAI.API.TemplateLibrary
{
    public static class Soc2LiteTemplate
    {
        public static TemplateDefinition Build()
        {
            return new TemplateDefinition
            {
                Key = "soc2-lite",

                Name = "SOC 2 Lite",

                Description =
                    "SOC 2 aligned security, availability and confidentiality assessment.",

                Version = "1",

                Sections = new()
                {
                    BuildSecurity(),
                    BuildAvailability(),
                    BuildConfidentiality()
                }
            };
        }

        private static SectionDefinition BuildSecurity()
        {
            return new SectionDefinition
            {
                Title = "Security",

                Description =
                    "Logical and administrative security controls.",

                Questions = new()
                {
                    new QuestionDefinition
                    {
                        QuestionText =
                            "Do you enforce MFA for all workforce users?",
                        QuestionType = "YesNo",
                        Category = "Security",
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
                            "How often are privileged access reviews performed?",
                        QuestionType = "SingleSelect",
                        Category = "Security",
                        Severity = "High",
                        Weight = 7,
                        Options = new()
                        {
                            new OptionDefinition
                            {
                                OptionText = "Quarterly",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "Annually"
                            },
                            new OptionDefinition
                            {
                                OptionText = "Ad Hoc"
                            },
                            new OptionDefinition
                            {
                                OptionText = "Never"
                            }
                        }
                    },

                    new QuestionDefinition
                    {
                        QuestionText =
                            "Which vulnerability management activities are performed?",
                        QuestionType = "MultiSelect",
                        Category = "Security",
                        Severity = "High",
                        Weight = 7,
                        Options = new()
                        {
                            new OptionDefinition
                            {
                                OptionText = "Automated Scanning",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "Penetration Testing",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "Manual Reviews"
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
                            "Do you maintain an incident response plan?",
                        QuestionType = "YesNo",
                        Category = "Security",
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
                            "Which security awareness activities are provided?",
                        QuestionType = "MultiSelect",
                        Category = "Security",
                        Severity = "Medium",
                        Weight = 3,
                        Options = new()
                        {
                            new OptionDefinition
                            {
                                OptionText = "Annual Training",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "Phishing Simulations",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "Policy Acknowledgement"
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

        private static SectionDefinition BuildAvailability()
        {
            return new SectionDefinition
            {
                Title = "Availability",

                Description =
                    "System uptime, resiliency and recovery controls.",

                Questions = new()
                {
                    new QuestionDefinition
                    {
                        QuestionText =
                            "How is system availability monitored?",
                        QuestionType = "SingleSelect",
                        Category = "Availability",
                        Severity = "High",
                        Weight = 7,
                        Options = new()
                        {
                            new OptionDefinition
                            {
                                OptionText = "24/7 Monitoring",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "Business Hours Only"
                            },
                            new OptionDefinition
                            {
                                OptionText = "Manual Monitoring"
                            }
                        }
                    },

                    new QuestionDefinition
                    {
                        QuestionText =
                            "How frequently are backups tested?",
                        QuestionType = "SingleSelect",
                        Category = "Availability",
                        Severity = "High",
                        Weight = 7,
                        Options = new()
                        {
                            new OptionDefinition
                            {
                                OptionText = "Monthly",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "Quarterly"
                            },
                            new OptionDefinition
                            {
                                OptionText = "Annually"
                            },
                            new OptionDefinition
                            {
                                OptionText = "Never"
                            }
                        }
                    },

                    new QuestionDefinition
                    {
                        QuestionText =
                            "Which recovery capabilities are implemented?",
                        QuestionType = "MultiSelect",
                        Category = "Availability",
                        Severity = "High",
                        Weight = 7,
                        Options = new()
                        {
                            new OptionDefinition
                            {
                                OptionText = "Disaster Recovery Plan",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "Business Continuity Plan",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "Recovery Testing",
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
                            "Do you maintain documented recovery objectives?",
                        QuestionType = "YesNo",
                        Category = "Availability",
                        Severity = "Medium",
                        Weight = 3,
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
                    }
                }
            };
        }

        private static SectionDefinition BuildConfidentiality()
        {
            return new SectionDefinition
            {
                Title = "Confidentiality",

                Description =
                    "Protection of confidential information.",

                Questions = new()
                {
                    new QuestionDefinition
                    {
                        QuestionText =
                            "How is confidential data protected at rest?",
                        QuestionType = "SingleSelect",
                        Category = "Confidentiality",
                        Severity = "Critical",
                        Weight = 10,
                        Options = new()
                        {
                            new OptionDefinition
                            {
                                OptionText = "AES-256",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "AES-128"
                            },
                            new OptionDefinition
                            {
                                OptionText = "No Encryption"
                            }
                        }
                    },

                    new QuestionDefinition
                    {
                        QuestionText =
                            "Which controls are used for confidential data?",
                        QuestionType = "MultiSelect",
                        Category = "Confidentiality",
                        Severity = "Critical",
                        Weight = 10,
                        Options = new()
                        {
                            new OptionDefinition
                            {
                                OptionText = "Data Classification",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "Access Restrictions",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "Encryption",
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
                            "Do you securely dispose confidential data?",
                        QuestionType = "YesNo",
                        Category = "Confidentiality",
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
                    }
                }
            };
        }
    }
}