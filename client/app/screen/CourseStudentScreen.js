import React, { useEffect } from "react";

//Bootstrap imports
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";

//React related imports
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  fetchAllCourses,
  fetchCourseStudents,
  selectCourses,
} from "../store/slices/courseSlices";

const CourseStudentScreen = () => {
  const dispatch = useDispatch();
  const { courseId } = useParams();

  const course = useSelector(selectCourses);

  useEffect(() => {
    dispatch(fetchCourseStudents(courseId));
  }, [dispatch]);

  return (
    <div>
      <h1>Students in {course.name}</h1>
      <Table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {course.students && course.students.length
            ? course.students.map((student) => {
                return (
                  <tr key={student.id} href={"/courses"}>
                    <td>{student.firstName}</td>
                    <td>{student.lastName}</td>
                    <td>{student.id}</td>
                    <td>
                      <Link
                        to={`/report/students?courseId=${courseId}&studentId=${student.id}`}
                      >
                        View report
                      </Link>
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </Table>
    </div>
  );
};

export default CourseStudentScreen;