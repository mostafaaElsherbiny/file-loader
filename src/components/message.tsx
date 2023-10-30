import './message.css'

export type StatusType = "warning" | "success" | "none";

interface MessageProps {
  type: StatusType;
  message: string;
  resetParentMessage: () => void;
}

function Message({ type, message, resetParentMessage }: MessageProps) {
  const resetMessage = () => {
    resetParentMessage();
  };

  return (
    <>
      {type === "success" && (
        <div className="alert alert-success alert-white rounded">
          <button
            type="button"
            className="close"
            aria-hidden="true"
            onClick={resetMessage}
          >
            ×
          </button>
          <div className="icon">
            <i className="bx bx-check"></i>
          </div>
          <strong>Success!</strong> {message}
        </div>
      )}

      {type === "warning" && (
        <div className="alert alert-danger alert-white rounded">
          <button
            type="button"
            className="close"
            aria-hidden="true"
            onClick={resetMessage}
          >
            ×
          </button>
          <div className="icon">
            <i className="bx bxs-info-circle"></i>
          </div>
          <strong>Error!</strong> {message}
        </div>
      )}
    </>
  );
}

export default Message;
