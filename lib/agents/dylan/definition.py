from __future__ import annotations

from pathlib import Path

from agents.capabilities import AgentCapabilities
from agents.definitions import AgentDefinition
from agents.dylan.session_bootstrap import build_bootstrap_prompt, build_resume_prompt
from agents.dylan.workspace_contract import ensure_workspace_contract
from agents.project_resolver import known_project_slugs, load_chat_project_map, resolve_project


def _resolve_workspace(project_slug: str, chat_id: str) -> tuple[str, Path]:
    project = resolve_project(slug=project_slug, chat_id=chat_id, mapping=load_chat_project_map())
    if project is None and not project_slug:
        known = sorted(known_project_slugs())
        if len(known) == 1:
            project = resolve_project(slug=known[0], mapping=load_chat_project_map())
    if project is None or not project.get("workspace"):
        raise RuntimeError("workspace not resolved")
    slug = str(project.get("slug") or project_slug or "").strip()
    workspace = Path(str(project["workspace"])).expanduser().resolve()
    if not workspace.is_dir():
        raise RuntimeError(f"workspace missing: {workspace}")
    return slug, workspace


DYLAN_DEFINITION = AgentDefinition(
    id="dylan",
    display_name="Dylan",
    role="scan",
    soul_path=Path(__file__).with_name("soul.md"),
    soul_version="4",
    protocol_version="5",
    workflow="auto_scan",
    result_contract="scan-result.json",
    permission_profile="workspace_autonomous",
    capabilities=AgentCapabilities(
        direct_workspace_write=True,
        allowed_workflows=("risk.query", "risk.resolve", "scan.verify"),
        allowed_mutations=("risk.mark_remediated", "risk.resolve"),
        external_side_effects=("feishu.reply",),
    ),
    build_bootstrap_prompt=build_bootstrap_prompt,
    build_resume_prompt=build_resume_prompt,
    ensure_workspace_contract=ensure_workspace_contract,
    resolve_workspace=_resolve_workspace,
    action_adapter=None,
    config_key="dylan",
)
