"use client";

import Mentor from "@/frontend/modules/entities/Mentor";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CourseItemPage() {
  const params = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    (async () => {
      const getCourseStatus = await Mentor.fetchCourse(params.id);

      if (getCourseStatus.success) {
        setCourse(getCourseStatus.course);
      }
    })();
  }, []);

  if (course == null) {
    return <div>Fetching Course...</div>;
  }

  return (
    <div className="">
      <h1 className="">{course.title}</h1>
      <div>
        <p
          className=""
          dangerouslySetInnerHTML={{ __html: course.description }}
        />
      </div>
      <div>{course.created_by}</div>
      <div>{course.created_at}</div>
      <div>
        <label htmlFor="published" className="">
          Published
          <input
            id="published"
            type="checkbox"
            name=""
            checked={course.published}
            onChange={(event) =>
              setCourse({
                ...course,
                published: event.target.checked,
              })
            }
          />
        </label>
      </div>
      <div></div>
    </div>
  );
}
