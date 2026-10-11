import React from "react";
import {
  ArrowLeft,
  User,
  FolderGit2,
  Briefcase,
  Cpu,
  Award,
  Send,
  ExternalLink,
} from "lucide-react";
import { useWorkspace } from "../../context/WorkspaceContext.jsx";
import { portfolioData } from "../../config/portfolioData.js";
import ModeToggle from "../ModeToggle.jsx";

export default function ExplorationView() {
  const { exitExplorationMode } = useWorkspace();

  return (
    <div className="min-h-screen w-full bg-[var(--pp-background)] text-[var(--pp-text-primary)] flex flex-col transition-colors duration-300">
      {/* Exploration Header */}
      <header className="h-16 px-4 sm:px-6 w-full flex items-center justify-between border-b border-[var(--pp-border)] bg-[var(--pp-surface)]/80 backdrop-blur-md sticky top-0 z-40">
        <button
          onClick={exitExplorationMode}
          type="button"
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--pp-border)] bg-[var(--pp-surface-secondary)] text-xs font-semibold text-[var(--pp-text-primary)] hover:bg-[var(--pp-surface)] transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pp-primary)]"
        >
          <ArrowLeft className="w-4 h-4 text-[var(--pp-primary)]" />
          <span>Return to Workspace</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs text-[var(--pp-text-muted)] hidden sm:inline">
            Direct Exploration View
          </span>
          <ModeToggle />
        </div>
      </header>

      {/* Main Exploration Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 sm:py-12 flex flex-col gap-12">
        {/* Section 1: Identity */}
        <section className="p-6 sm:p-8 rounded-2xl border border-[var(--pp-border)] bg-[var(--pp-surface)] shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-[var(--pp-primary-subtle)] text-[var(--pp-primary)]">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                {portfolioData.identity.name}
              </h1>
              <p className="text-xs font-semibold text-[var(--pp-primary-soft)]">
                {portfolioData.identity.title} • {portfolioData.identity.location}
              </p>
            </div>
          </div>
          <p className="text-sm text-[var(--pp-text-secondary)] leading-relaxed">
            {portfolioData.identity.bio}
          </p>
        </section>

        {/* Section 2: Projects Outline */}
        <section className="p-6 sm:p-8 rounded-2xl border border-[var(--pp-border)] bg-[var(--pp-surface)] shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-[var(--pp-primary-subtle)] text-[var(--pp-primary)]">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold tracking-tight">Featured Projects</h2>
          </div>
          <p className="text-sm text-[var(--pp-text-muted)] italic">
            Verified case studies and repository links will appear here as portfolio data is configured.
          </p>
        </section>

        {/* Section 3: Experience Outline */}
        <section className="p-6 sm:p-8 rounded-2xl border border-[var(--pp-border)] bg-[var(--pp-surface)] shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-[var(--pp-primary-subtle)] text-[var(--pp-primary)]">
              <Briefcase className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold tracking-tight">Experience</h2>
          </div>
          <p className="text-sm text-[var(--pp-text-muted)] italic">
            Professional journey and career timeline.
          </p>
        </section>

        {/* Section 4: Skills */}
        <section className="p-6 sm:p-8 rounded-2xl border border-[var(--pp-border)] bg-[var(--pp-surface)] shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-[var(--pp-primary-subtle)] text-[var(--pp-primary)]">
              <Cpu className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold tracking-tight">Skills & Technologies</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {[...portfolioData.skills.frontend, ...portfolioData.skills.tools].map(
              (skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-lg bg-[var(--pp-surface-secondary)] border border-[var(--pp-border)] text-xs font-medium text-[var(--pp-text-secondary)]"
                >
                  {skill}
                </span>
              )
            )}
          </div>
        </section>

        {/* Section 5: Proof Outline */}
        <section className="p-6 sm:p-8 rounded-2xl border border-[var(--pp-border)] bg-[var(--pp-surface)] shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-[var(--pp-primary-subtle)] text-[var(--pp-primary)]">
              <Award className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold tracking-tight">Achievements & Proof</h2>
          </div>
          <p className="text-sm text-[var(--pp-text-muted)] italic">
            Hackathons, awards, and metrics.
          </p>
        </section>

        {/* Section 6: Connect */}
        <section className="p-6 sm:p-8 rounded-2xl border border-[var(--pp-border)] bg-[var(--pp-surface)] shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-[var(--pp-primary-subtle)] text-[var(--pp-primary)]">
              <Send className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold tracking-tight">Connect</h2>
          </div>
          <p className="text-sm text-[var(--pp-text-secondary)]">
            Interested in collaboration or learning more about my work?
          </p>
        </section>
      </main>
    </div>
  );
}
