# Skill discovery evaluation

Use this protocol when release metadata, README positioning, or `SKILL.md` discovery text changes. It measures whether the Skill can be found and used; it does not assign a speculative “GEO score.”

## Automated preflight

Run the deterministic checks locally:

```bash
npm run test:discovery
npm run validate
npm test
```

The first command verifies that the standard Skill path, name, install commands, and all fixed discovery queries remain represented in the public metadata. It does not contact a search service.

Run the live GitHub search checks only after a release has propagated:

```bash
npm run test:discovery:remote -- --out discovery-report.json
```

The remote command checks every query in `tests/discovery_queries.json`, confirms the expected repository is among the first 30 results, and verifies `gh skill preview`. Keep the JSON report as evidence for that release; a rate-limit or crawler-delay error is a blocked check, not a pass.

## Manual AI-tool sample

Run the fixed queries in `tests/discovery_queries.json` with web search enabled in the AI tools you want to measure. Use a clean conversation for each query and do not provide the repository URL in advance.

Record:

| Date | Tool/model | Web search | Query ID | Skill named | Correct install command | Correct GitHub URL | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |

Also note the model version and whether the result was a direct source link, a directory link, or an answer inferred without a source. Never count an unlinked brand mention as a confirmed citation.

## Pass criteria

- `gh skill preview` succeeds for the current version.
- `gh skill install OWNER/REPO roblox-style-video@VERSION` installs a self-contained directory and the bundled scripts run.
- Exact-name searches return the repository and the `skills/roblox-style-video/SKILL.md` path.
- Natural-language searches at minimum expose the Skill in the sampled results or reveal which metadata still needs work.
- Agent answers do not claim unsupported behavior, such as direct control of Roblox Studio or a video-model API that the Skill does not call.

## Cadence

Run the automated preflight on every pull request. Run the live registry checks after publishing each release and again 48–72 hours later. Re-run the manual AI sample monthly or after a meaningful README, description, or registry-placement change.
