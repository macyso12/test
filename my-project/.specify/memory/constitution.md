<!--
Sync Impact Report
==================
Version change: N/A → 1.0.0 (initial ratification)
Added sections:
  - Core Principles (I–IV)
  - Performance Standards
  - Development Workflow
  - Governance
Modified principles: N/A (first version)
Removed sections: N/A
Templates requiring updates:
  - .specify/templates/plan-template.md ✅ — Constitution Check gates align with principles I–IV
  - .specify/templates/spec-template.md ✅ — Success Criteria section supports measurable UX/perf metrics
  - .specify/templates/tasks-template.md ✅ — Test tasks, performance tasks, and UX tasks all map to principles
Deferred TODOs: none
-->

# my-project Constitution

## Core Principles

### I. Code Quality (NON-NEGOTIABLE)

All code MUST be clean, readable, and maintainable. Every module, function, and
class MUST have a single, well-defined responsibility. Code MUST be reviewed
before merging; no feature lands without at least one peer review.

- Cyclomatic complexity MUST NOT exceed 10 per function.
- Public APIs MUST be documented with purpose, parameters, and return values.
- Dead code, commented-out blocks, and unused imports MUST NOT be committed.
- Linting and static analysis MUST pass with zero errors before merge.

**Rationale**: Readable code reduces onboarding time, prevents defects, and
lowers long-term maintenance cost. Complexity limits keep logic auditable.

### II. Testing Standards (NON-NEGOTIABLE)

Test-Driven Development (TDD) is mandatory for all new features and bug fixes.
Tests MUST be written and confirmed failing before implementation begins.
Red-Green-Refactor is the enforced cycle.

- Unit test coverage MUST be ≥ 80% for all new code.
- Integration tests MUST cover every public API contract and inter-service
  boundary.
- Tests MUST run in under 5 minutes in CI; slow tests MUST be profiled and
  optimised.
- Flaky tests MUST be fixed or removed within one sprint of discovery.
- No PR may be merged if any test is red.

**Rationale**: Tests are the primary safety net for refactoring and the living
documentation of intended behaviour. A failing suite is a deployment blocker.

### III. User Experience Consistency

All user-facing surfaces (UI, CLI, API responses, error messages) MUST follow
the project's established design system and interaction patterns. Deviations
require explicit approval and documentation.

- Visual components MUST use design-system tokens (colours, spacing, typography)
  exclusively; hardcoded values are prohibited.
- Error messages MUST be actionable: state what went wrong and what the user
  can do next.
- Interaction flows MUST be validated against acceptance criteria defined in the
  feature spec before shipping.
- Accessibility MUST meet WCAG 2.1 AA for all UI surfaces.

**Rationale**: Consistency reduces cognitive load, builds user trust, and cuts
support costs. Accessibility compliance is a baseline, not an enhancement.

### IV. Performance Requirements

Performance is a feature. Every user-facing operation MUST meet defined
latency and resource budgets; exceeding them blocks release.

- API endpoints MUST respond within 200 ms at p95 under expected load.
- Page/screen initial render MUST complete within 2 s on a mid-range device
  over a 4G connection.
- Background jobs MUST document their expected throughput and MUST NOT degrade
  foreground service latency by more than 5%.
- Memory footprint MUST be profiled for any feature that processes unbounded
  data sets; streaming or pagination MUST be used where applicable.
- Performance regressions detected in CI MUST be investigated before merge.

**Rationale**: Slow software loses users. Budget-based gates in CI catch
regressions early when they are cheapest to fix.

## Performance Standards

The following thresholds are binding. Any feature that violates them MUST
include a Complexity Tracking entry in its plan justifying the exception and
proposing a remediation timeline.

| Metric                    | Budget         | Measurement Method          |
|---------------------------|----------------|-----------------------------|
| API p95 latency           | ≤ 200 ms       | Load test in CI (k6/locust) |
| UI time-to-interactive    | ≤ 2 s          | Lighthouse / WebPageTest    |
| Unit test suite           | ≤ 2 min        | CI timer                    |
| Full test suite           | ≤ 5 min        | CI timer                    |
| New-code coverage         | ≥ 80%          | Coverage report in CI       |
| Cyclomatic complexity     | ≤ 10/fn        | Static analysis gate        |

## Development Workflow

1. Feature work MUST begin with a spec (`/speckit.specify`) and plan
   (`/speckit.plan`) before any code is written.
2. TDD cycle: write tests → confirm red → implement → confirm green → refactor.
3. All code changes MUST pass linting, static analysis, and the full test suite
   in CI before review.
4. Peer review is required for every PR; self-merges are prohibited.
5. Performance budgets MUST be verified in CI before merge (see Performance
   Standards above).
6. UX changes MUST include acceptance-scenario validation against the spec's
   user stories before shipping.
7. Commits MUST be atomic and descriptive; squash noise before merge.

## Governance

This constitution supersedes all other project guidelines. Any conflict between
this document and a team practice, tool default, or individual preference is
resolved in favour of this constitution.

**Amendment procedure**:
1. Propose a change via PR, referencing the principle(s) affected.
2. Obtain approval from at least two project maintainers.
3. Update `CONSTITUTION_VERSION`, `LAST_AMENDED_DATE`, and the Sync Impact
   Report comment at the top of this file.
4. Communicate the amendment in the team channel before merging.

**Versioning policy** (semantic):
- MAJOR — backward-incompatible removal or redefinition of a principle.
- MINOR — new principle or section added; material expansion of existing guidance.
- PATCH — clarifications, wording fixes, non-semantic refinements.

**Compliance review**: Principles I and II are checked automatically via CI
gates. Principles III and IV are reviewed manually in each PR by the reviewer.
A quarterly review of all four principles is conducted by maintainers.

**Version**: 1.0.0 | **Ratified**: 2026-06-12 | **Last Amended**: 2026-06-12
