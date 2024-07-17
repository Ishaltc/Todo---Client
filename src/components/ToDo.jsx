import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

const ToDo = ({ toDo, setUpdateData, deleteTask }) => {
  return (
    <div>
      {toDo &&
        toDo.map((task, index) => {
          return (
            <React.Fragment key={task.id}>
              <div className="col taskBg">
                <div className={task.status ? "done" : ""}>
                  <span className="taskNumber">{index + 1}</span>
                  <span className="taskTest">{task.name}</span>
                </div>
                <div className="iconsWrap">
                  <span
                    title="Edit"
                    onClick={() =>
                      setUpdateData({
                        id: task._id,
                        title: task.name,
                      })
                    }
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </span>

                  <span title="Delete" onClick={() => deleteTask(task._id)}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </span>
                </div>
              </div>
            </React.Fragment>
          );
        })}
    </div>
  );
};
export default ToDo;
