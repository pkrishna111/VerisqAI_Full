namespace VerisqAI.API.TemplateLibrary
{
    public static class VendorSecurityTemplate
    {
        public static TemplateDefinition Build()
        {
            return new TemplateDefinition
            {
                Key = "vendor-security",

                Name = "Vendor Security Assessment",

                Description =
                    "Comprehensive vendor security risk assessment template.",

                Version = 1,

                Sections = new()
                {
                    BuildAccessControl(),
                    BuildDataProtection(),
                    BuildIncidentResponse(),
                    BuildBusinessContinuity(),
                    BuildCompliance()
                }
            };
        }

        private static SectionDefinition BuildAccessControl()
        {
            return new SectionDefinition
            {
                Title = "Access Control",

                Description =
                    "Identity and access management controls.",

                Questions = new()
                {
                    new QuestionDefinition
                    {
                        QuestionText =
                            "Do you enforce multi-factor authentication for all users?",

                        QuestionType = "YesNo",

                        Category = "Identity & Access",

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
                            "Which MFA methods are enforced?",

                        QuestionType = "MultiSelect",

                        Category = "Identity & Access",

                        Severity = "High",

                        Weight = 7,

                        Options = new()
                        {
                            new OptionDefinition
                            {
                                OptionText =
                                    "Authenticator App",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText =
                                    "Hardware Token",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "SMS"
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
                            "Which authentication mechanisms are supported?",

                        QuestionType = "SingleSelect",

                        Category = "Identity & Access",

                        Severity = "High",

                        Weight = 7,

                        Options = new()
                        {
                            new OptionDefinition
                            {
                                OptionText = "SSO",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText =
                                    "Username/Password"
                            },
                            new OptionDefinition
                            {
                                OptionText = "LDAP"
                            },
                            new OptionDefinition
                            {
                                OptionText =
                                    "Local Accounts"
                            }
                        }
                    },

                    new QuestionDefinition
                    {
                        QuestionText =
                            "Are privileged accounts reviewed periodically?",

                        QuestionType = "SingleSelect",

                        Category = "Identity & Access",

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
                            "Are dormant accounts automatically disabled?",

                        QuestionType = "YesNo",

                        Category = "Identity & Access",

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

        private static SectionDefinition BuildDataProtection()
        {
            return new SectionDefinition
            {
                Title = "Data Protection",

                Description =
                    "Data security and encryption controls.",

                Questions = new()
                {
                    new QuestionDefinition
                    {
                        QuestionText =
                            "Is data encrypted at rest?",

                        QuestionType = "SingleSelect",

                        Category = "Data Protection",

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
                                OptionText =
                                    "Partial Encryption"
                            },
                            new OptionDefinition
                            {
                                OptionText =
                                    "Not Encrypted"
                            }
                        }
                    },

                    new QuestionDefinition
                    {
                        QuestionText =
                            "Is data encrypted in transit?",

                        QuestionType = "SingleSelect",

                        Category = "Data Protection",

                        Severity = "Critical",

                        Weight = 10,

                        Options = new()
                        {
                            new OptionDefinition
                            {
                                OptionText = "TLS 1.3",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "TLS 1.2",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "SSL"
                            },
                            new OptionDefinition
                            {
                                OptionText =
                                    "Not Encrypted"
                            }
                        }
                    }
                }
            };
        }

        private static SectionDefinition BuildIncidentResponse()
        {
            return new SectionDefinition
            {
                Title = "Incident Response",

                Description =
                    "Incident management capabilities.",

                Questions = new()
                {
                    new QuestionDefinition
                    {
                        QuestionText =
                            "Do you maintain an incident response plan?",

                        QuestionType = "YesNo",

                        Category =
                            "Incident Response",

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

        private static SectionDefinition BuildBusinessContinuity()
        {
            return new SectionDefinition
            {
                Title = "Business Continuity",

                Description =
                    "Business continuity and disaster recovery.",

                Questions = new()
                {
                    new QuestionDefinition
                    {
                        QuestionText =
                            "Do you maintain a business continuity plan?",

                        QuestionType = "YesNo",

                        Category =
                            "Business Continuity",

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

        private static SectionDefinition BuildCompliance()
        {
            return new SectionDefinition
            {
                Title = "Compliance",

                Description =
                    "Compliance and governance controls.",

                Questions = new()
                {
                    new QuestionDefinition
                    {
                        QuestionText =
                            "Which certifications are maintained?",

                        QuestionType = "MultiSelect",

                        Category = "Compliance",

                        Severity = "Medium",

                        Weight = 3,

                        Options = new()
                        {
                            new OptionDefinition
                            {
                                OptionText = "SOC 2",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "ISO 27001",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "PCI DSS"
                            },
                            new OptionDefinition
                            {
                                OptionText = "HIPAA"
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
    }
}
