import React from 'react';

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";

import "components/Appointment/styles.scss";



export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    //SAVING mode until SHOW or ERROR tranistion executed by bookInterview function
    transition(SAVING);
    const done = () => transition(SHOW);

    props.bookInterview(props.id, interview, done);
    
  }
  const { mode, transition, back } = useVisualMode( 
    props.interview ? SHOW : EMPTY
    
  );
  
  
  return (
    <>
    <article className="appointment">
      <Header time={props.time}/>
      
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}
      {mode === SAVING && (<Status message="saving"/>) }
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => console.log("editing")} onDelete={() => console.log("deleting")}
        />
        )}

    </article>
    </>
  )
  
} 
