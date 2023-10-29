
import "./loadText.css";

function LoadText({ text }: { text: string }) {
  return (
    <div className="responsive-container">
      <p className="responsive-text" data-testid="loaded-p">{text}</p>
    </div>
  );
}

export default LoadText;
