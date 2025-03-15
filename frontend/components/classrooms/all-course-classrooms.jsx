export default function AllCourseClassrooms() {
  return (
    <>
      <div className="accordion accordion-flush" id="accordion-tasks-daywise">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={"#flush-collapse-day-" + "index + 1"}
              aria-expanded="false"
              aria-controls={"flush-collapse-day-" + "index + 1"}
            >
              Accordion 1
            </button>
          </h2>
          <div
            id={"flush-collapse-day-" + "index + 1"}
            className="accordion-collapse collapse"
            data-bs-parent="#accordion-tasks-daywise"
          >
            <p className="">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum,
              maxime! Animi sed laborum nihil harum quibusdam magnam cupiditate
              officia nesciunt dolorem molestiae optio consectetur rem veritatis
              quaerat adipisci debitis fuga sit blanditiis unde, expedita
              accusantium?
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
