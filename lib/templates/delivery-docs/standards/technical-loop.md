# Technical Loop

The Technical Loop turns a business-ready story into an approved technical plan.

## Inputs

- `story.md`
- `metadata.json`
- Relevant repository context
- Runtime profile information

## Outputs

- `technical-plan.md`
- Updated `metadata.json.technicalStatus` through Lumen or explicit status update

## Rules

- Do not start technical planning until `businessStatus` is `ready`.
- Do not implement code until `technicalStatus` is `approved`.
- Keep implementation details out of `story.md`.
- If a plan reveals a business ambiguity, return to the Business Loop.
