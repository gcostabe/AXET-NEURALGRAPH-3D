# AGENT BOOTSTRAP — PERSISTENT MEMORY AND EXECUTION RECOVERY

## ABSOLUTE PRIORITY

The latest user message is always the authoritative source of current intent.

Persistent memory provides context.

Persistent memory does not create intent.

Never execute a task only because it appears as ACTIVE, PENDING, TODO, NEXT, RECOMMENDED, IN_PROGRESS or SUSPENDED in memory.

---

## AUTHORITY HIERARCHY

```text
1. CURRENT USER REQUEST
2. .agent/current_task.md
3. current workspace source code
4. .agent/state.md
5. .agent/decisions.md
6. .stack_tech.md
7. .agent/execution_journal.md
8. .agent/history/
9. conversation history
```

`.agent/current_task.md` may only trigger resumption of execution when the current user message indicates continuity, or when context was lost during the same execution. A new, different message always takes priority.

---

## INTENT CLASSIFICATION

Before technical execution, classify the latest user message as:

- NEW_TASK
- CONTINUE_TASK
- INFORMATIONAL

If NEW_TASK: the new request overrides previous tasks. Old task → SUSPENDED, Resume Authorization: NO. New request → ACTIVE.

If CONTINUE_TASK (e.g. "continue", "prossiga", "retome", "pode continuar", "termine aquilo"): read `.agent/current_task.md`, recover checkpoint from `.agent/execution_journal.md`, verify source, then continue.

If INFORMATIONAL (a question or analysis that does not mean resuming previous work): answer the current request. Do not resume old tasks.

---

## SESSION BOOTSTRAP

At the beginning of a session:

1. Load these rules.
2. Do not automatically execute old work.
3. Wait for the current user request.
4. Classify current intent.
5. Load only the memory required for that request.

It is PROHIBITED to: open a new chat → read an old task → execute it automatically. A new session means recovering the capacity to understand context. It does not mean authorization to continue old work.

---

## MEMORY LOSS WATCHDOG

Assume conversational memory can disappear at any moment. No critical execution information may exist only in conversation history.

During long or multi-step work, persist checkpoints in `.agent/current_task.md` and `.agent/execution_journal.md`.

---

## MEMORY UNCERTAINTY DETECTION

If at any moment you are uncertain about:

- what task is currently being executed;
- which step is active;
- what has already been completed;
- what file was changed;
- why a change was made;
- whether a command already ran;
- what the next safe action is;
- whether you are about to repeat previous work;

STOP. Do not guess. Do not repeat previous steps.

Read `.agent/current_task.md`, then inspect `.agent/execution_journal.md`, then reconcile with the actual relevant source files. Resume only after identifying the last safe checkpoint.

---

## RECOVERY IS NOT AUTHORIZATION

Recovering previous context does not automatically authorize previous work. A previous task may only be resumed when:

1. the current user request explicitly indicates continuation; OR
2. context was lost during the currently executing task.

---

## CURRENT USER REQUEST HAS PRIORITY

Always ask internally: WHAT DID THE USER ASK ME TO DO NOW?

The answer must come from the latest user message. Never infer current intent from historical memory alone.

`.agent/current_task.md` contains the execution checkpoint for the current or suspended task. It is not authorization by itself.

---

## CHECKPOINT POLICY

Persist a checkpoint whenever:

- investigation identifies the root cause;
- an important technical decision is made;
- a relevant file is modified;
- a planned step completes;
- validation succeeds or fails;
- execution moves to another subsystem;
- the next safe action changes;
- the model detects memory uncertainty;
- conversation summarization or context loss occurs.

### Write-ahead checkpoint

Before a significant change, persist: intended action, relevant file, reason, current state, expected next action.

After the change, persist: what actually changed, result, validation, next safe action.

---

## SOURCE OF TRUTH

- Current user intent: latest user message.
- Current implementation: actual source files.
- Current execution: `.agent/current_task.md`
- Execution checkpoints: `.agent/execution_journal.md`
- Current project state: `.agent/state.md`
- Architecture: `.stack_tech.md`
- Permanent decisions: `.agent/decisions.md`
- History: `.agent/history/`

---

## CONTEXT EFFICIENCY

Never automatically load: the entire repository, the entire execution journal, all historical files, complete Git history, all logs.

Retrieve selectively.

---

## CONFLICT RESOLUTION

If memory disagrees with source code: SOURCE CODE WINS. Update stale memory after confirming the real implementation.

---

## SAFETY

Never execute destructive permanent actions without explicit authorization. Prefer atomic commands. Never occupy the execution channel indefinitely just to watch stdout/stderr. Follow `.stdout-stderr-instructions.md`.

---

## NEW TASK PROTOCOL

When a new technical request arrives and an ACTIVE task exists:

1. Old task → SUSPENDED, Resume Authorization: NO. Consolidate its checkpoint.
2. Create new Task ID (format: `TASK-YYYYMMDD-HHMM-SHORT-NAME`), with User Request, Objective, Execution Cursor.
3. Reinitialize `.agent/execution_journal.md` for the new Task ID (consolidate the previous task into `.agent/history/YYYY-MM.md` first if relevant).

### Cancellation

When the user says "cancele", "pare", "não faça mais isso", "abandone essa implementação": mark `Status: CANCELLED`, `Resume Authorization: NO`. Never resume automatically.

---

## ZOMBIE TASK DETECTOR

A ZOMBIE TASK is an old task executed without authorization from the current request.

Before a technical action, verify internally: "Does this action belong to the CURRENT USER REQUEST or to an explicitly resumed task?" If NO: STOP.

## NO TASK DRIFT

Every action during execution must relate to the current `Task ID`. If an interesting but unnecessary problem surfaces, register it in `state.md → Open Threads` and do NOT execute it.

---

## CONTEXT BUDGET

Never automatically load all history, all Git log, all logs, all source, or the entire old journal.

Priority: `current_task` > `latest checkpoint` > `relevant source` > `state` > `decisions` > `history`.

---

## BOOTSTRAP TEST

If asked `bootstrap-status`, respond `BOOTSTRAP_ACTIVE`, then verify `.agent/current_task.md`, `.agent/state.md`, `.agent/execution_journal.md` and report whether each exists — do not execute any pending task.

If asked `recovery-status`: do NOT execute the task. Only read `.agent/current_task.md` and the latest checkpoint, and respond with Task ID, Status, Phase, Current Step, Last Safe Checkpoint, Last Action, Next Safe Action, Resume Authorization.

If asked `checkpoint-status`: return only Task ID, Latest Checkpoint, Checkpoint State, Latest Confirmed Result, Next Safe Action — without executing the next action.

---

## FINAL RULE

> THE CURRENT USER REQUEST DEFINES WHAT TO DO.
>
> CURRENT_TASK DEFINES WHERE AN AUTHORIZED TASK STOPPED.
>
> EXECUTION_JOURNAL DEFINES WHAT ACTUALLY HAPPENED.
>
> SOURCE CODE CONFIRMS REALITY.
>
> STATE PROVIDES PROJECT CONTEXT.
>
> HISTORY PROVIDES PAST CONTEXT.
>
> MEMORY LOSS MUST TRIGGER RECOVERY, NOT GUESSING.
>
> RECOVERY MUST NOT CREATE NEW INTENT.
>
> NEVER REPEAT COMPLETED WORK WITHOUT VERIFYING ITS REAL STATE.
>
> NEVER EXECUTE HISTORICAL WORK WITHOUT CURRENT AUTHORIZATION.
