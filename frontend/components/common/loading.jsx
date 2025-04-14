import "../../styles/common.css";

export default function Loading({ show }) {
  return (
    show && (
      <div
        id="spinner"
        className="show bg-white position-fixed translate-middle w-100 h-100 top-50 start-50 d-flex align-items-center justify-content-center"
      >
        <div
          className="loader-spinner spinner-border text-primary"
          role="status"
        ></div>
      </div>
    )
  );
}
