import { studentModel } from "./students.model";
import { Course } from "./courses.model";

export interface Inscriptions {
  id: string | number;
  studentdId: string | number;
  courseId: string | number;
  student?: studentModel;
  course?: Course;
}
