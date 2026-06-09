namespace VerisqAI.API.TemplateLibrary
{
    public static class Iso27001LiteTemplate
    {
        public static TemplateDefinition Build()
        {
            return new TemplateDefinition
            {
                Key = "iso27001-lite",

                Name = "ISO 27001 Lite",

                Description =
                    "ISO 27001 aligned information security assessment.",

                Version = "1",

                Sections = new()
                {
                    BuildInformationSecurityPolicies(),
                    BuildAssetManagement(),
                    BuildAccessControl(),
                    BuildOperationsSecurity(),
                    BuildSupplierRelationships()
                }
            };
        }

        private static SectionDefinition BuildInformationSecurityPolicies()
        {
            return new SectionDefinition
            {
                Title = "Information Security Policies",

                Description =
                    "Governance and policy management controls.",

                Questions = new()
                {
                    new QuestionDefinition
                    {
                        QuestionText =
                            "Do you maintain formally approved information security policies?",
                        QuestionType = "YesNo",
                        Category = "Information Security Policies",
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
                            "How often are security policies reviewed?",
                        QuestionType = "SingleSelect",
                        Category = "Information Security Policies",
                        Severity = "High",
                        Weight = 7,
                        Options = new()
                        {
                            new OptionDefinition
                            {
                                OptionText = "Annually",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "Every 2 Years"
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
                            "Which policy domains are documented?",
                        QuestionType = "MultiSelect",
                        Category = "Information Security Policies",
                        Severity = "Medium",
                        Weight = 3,
                        Options = new()
                        {
                            new OptionDefinition
                            {
                                OptionText = "Access Control",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "Incident Response",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "Risk Management",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "Business Continuity",
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

        private static SectionDefinition BuildAssetManagement()
        {
            return new SectionDefinition
            {
                Title = "Asset Management",

                Description =
                    "Inventory and ownership of information assets.",

                Questions = new()
                {
                    new QuestionDefinition
                    {
                        QuestionText =
                            "Do you maintain an asset inventory?",
                        QuestionType = "YesNo",
                        Category = "Asset Management",
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
                    },

                    new QuestionDefinition
                    {
                        QuestionText =
                            "Which asset types are tracked?",
                        QuestionType = "MultiSelect",
                        Category = "Asset Management",
                        Severity = "Medium",
                        Weight = 3,
                        Options = new()
                        {
                            new OptionDefinition
                            {
                                OptionText = "Hardware",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "Software",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "Cloud Assets",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "Data Assets",
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
                            "How frequently is the asset inventory reviewed?",
                        QuestionType = "SingleSelect",
                        Category = "Asset Management",
                        Severity = "Medium",
                        Weight = 3,
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
                    }
                }
            };
        }

        private static SectionDefinition BuildAccessControl()
        {
            return new SectionDefinition
            {
                Title = "Access Control",

                Description =
                    "Authentication and authorization controls.",

                Questions = new()
                {
                    new QuestionDefinition
                    {
                        QuestionText =
                            "Do you enforce MFA for workforce users?",
                        QuestionType = "YesNo",
                        Category = "Access Control",
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
                            "Which authentication methods are supported?",
                        QuestionType = "MultiSelect",
                        Category = "Access Control",
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
                                OptionText = "Authenticator App",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "Hardware Token",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "Password Only"
                            }
                        }
                    },

                    new QuestionDefinition
                    {
                        QuestionText =
                            "How often are privileged accounts reviewed?",
                        QuestionType = "SingleSelect",
                        Category = "Access Control",
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
                            "Are dormant accounts disabled automatically?",
                        QuestionType = "YesNo",
                        Category = "Access Control",
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

        private static SectionDefinition BuildOperationsSecurity()
        {
            return new SectionDefinition
            {
                Title = "Operations Security",

                Description =
                    "Monitoring, patching and incident management controls.",

                Questions = new()
                {
                    new QuestionDefinition
                    {
                        QuestionText =
                            "Which security monitoring controls are implemented?",
                        QuestionType = "MultiSelect",
                        Category = "Operations Security",
                        Severity = "High",
                        Weight = 7,
                        Options = new()
                        {
                            new OptionDefinition
                            {
                                OptionText = "SIEM",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "Centralized Logging",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "Alerting",
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
                            "How frequently are vulnerability scans performed?",
                        QuestionType = "SingleSelect",
                        Category = "Operations Security",
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
                            "Do you maintain a patch management process?",
                        QuestionType = "YesNo",
                        Category = "Operations Security",
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
                            "Which incident response capabilities exist?",
                        QuestionType = "MultiSelect",
                        Category = "Operations Security",
                        Severity = "High",
                        Weight = 7,
                        Options = new()
                        {
                            new OptionDefinition
                            {
                                OptionText = "Response Plan",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "Playbooks",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "Tabletop Exercises",
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

        private static SectionDefinition BuildSupplierRelationships()
        {
            return new SectionDefinition
            {
                Title = "Supplier Relationships",

                Description =
                    "Third-party risk management controls.",

                Questions = new()
                {
                    new QuestionDefinition
                    {
                        QuestionText =
                            "Do third-party vendors undergo security reviews?",
                        QuestionType = "YesNo",
                        Category = "Supplier Relationships",
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
                    },

                    new QuestionDefinition
                    {
                        QuestionText =
                            "Which vendor assurance mechanisms are used?",
                        QuestionType = "MultiSelect",
                        Category = "Supplier Relationships",
                        Severity = "Medium",
                        Weight = 3,
                        Options = new()
                        {
                            new OptionDefinition
                            {
                                OptionText = "Security Questionnaires",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "SOC Reports",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "ISO Certifications",
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
                            "How frequently are critical vendors reassessed?",
                        QuestionType = "SingleSelect",
                        Category = "Supplier Relationships",
                        Severity = "Medium",
                        Weight = 3,
                        Options = new()
                        {
                            new OptionDefinition
                            {
                                OptionText = "Annually",
                                IsPreferredAnswer = true
                            },
                            new OptionDefinition
                            {
                                OptionText = "Every 2 Years"
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
                    }
                }
            };
        }
    }
}