using System;
using System.Collections.Generic;
using System.Linq;

namespace VerisqAI.API.TemplateLibrary
{
    public static class ReadyMadeSections
    {
        public static List<SectionDefinition> Sections =>
            ReadyMadeTemplates.Templates
                .SelectMany(t => t.Sections)
                .GroupBy(s => s.Title)
                .Select(g => g.First())
                .OrderBy(s => s.Title)
                .ToList();

        public static SectionDefinition? Get(
    string key)
        {
            return Sections.FirstOrDefault(
                s =>
                    s.Title
                     .ToLower()
                     .Replace(" ", "-")
                     == key.ToLower()
            );
        }
    }
}