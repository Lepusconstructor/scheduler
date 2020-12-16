import React from "react";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import Form from "components/Appointment/Form";

import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const ERROR_SAVE = "ERROR_SAVE";
  const DELETING = "DELETING";
  const ERROR_DELETE = "ERROR_DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    if (name && interviewer) {
      const interview = {
        student: name,
        interviewer,
      };
      //SAVING mode until SHOW or ERROR tranistion executed by bookInterview function
      transition(SAVING);

      props
        .bookInterview(props.id, interview)
        .then(() => transition(SHOW))
        .catch((error) => transition(ERROR_SAVE, true));
    }
  };
  const destroy = () => {
    //display deleting mode until empty mode or error mode executed by deleteInterview function
    transition(DELETING, true);

    props
      .deleteInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  };

  const edit = () => {
    transition(EDIT);
  };
  const confirm = () => {
    transition(CONFIRM);
  };

  return (
    <>
      <article className="appointment" data-testid="appointment">
        <Header time={props.time} />

        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onEdit={edit}
            onDelete={confirm}
          />
        )}
        {mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            onCancel={back}
            onSave={save}
          />
        )}
        {mode === SAVING && <Status message="saving" />}
        {mode === CONFIRM && (
          <Confirm
            message="Are you sure you would like to delete?"
            onCancel={back}
            onConfirm={destroy}
          />
        )}
        {mode === DELETING && <Status message="deleting" />}
        {mode === EDIT && (
          <Form
            name={props.interview.student}
            interviewer={props.interview.interviewer.id}
            interviewers={props.interviewers}
            onCancel={back}
            onSave={save}
          />
        )}
        {mode === ERROR_SAVE && (
          <Error message="Appointment could not be saved" onClose={back} />
        )}
        {mode === ERROR_DELETE && (
          <Error message="Appointment could not be deleted" onClose={back} />
        )}
      </article>
    </>
  );
}
