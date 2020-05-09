
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DuremAdmin from "views/DuremAdmin/DuremAdmin.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import CourseAdmin from "views/CourseAdmin/CourseAdmin.js";
import PostAdmin from "views/PostAdmin/PostAdmin.js";
import Durem from "views/Durem/Durem.js"
import BeldehAdmin from "views/BeldehAdmin/BeldehAdmin.js";
import Test from "views/test/Test.js";
import Exam from "views/Exam/Exam.js";
import Beldeh from "views/beldeh/beldeh.js"
import CalendarStudent from "views/CalendarStudent/CalendarStudent.js";
import Tutorial from "views/tutorial/Tutorial.js"
import TutorialAdmin from "views/tutorialAdmin/TutorialAdmin.js"
import TestAdmin from "views/TestAdmin/TestAdmin.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
import Users from "views/Users/Users.js";
// core components/views for RTL layout


const dashboardRoutes = [
  {
    path: "/course",
    name: "Жолооны курс",
    icon: "content_paste",
    component: CourseAdmin,
    layout: "/director"
  },
  {
    path: "/course",
    name: "Жолооны курс",
    icon: "content_paste",
    component: CourseAdmin,
    layout: "/admin"
  },
  
  {
    path: "/durem",
    name: "Дүрэм админ",
    icon: Dashboard,
    component: DuremAdmin,
    layout: "/admin"
  },
  {
    path: "/users",
    name: "Хэрэглэгчид",
    icon: Dashboard,
    component: Users,
    layout: "/admin"
  },
  
  {
    path: "/news",
    name: "Мэдээ мэдээлэл",
    icon: LibraryBooks,
    component: PostAdmin,
    layout: "/admin"
  },
  {
    path: "/news",
    name: "Мэдээ мэдээлэл",
    icon: LibraryBooks,
    component: PostAdmin,
    layout: "/director"
  },
  {
    path: "/calendar",
    name: "Календарь",
    icon: "content_paste",
    component: CalendarStudent,
    layout: "/student"
  },
  {
    path: "/calendar",
    name: "Календарь",
    icon: "content_paste",
    component: CalendarStudent,
    layout: "/teacher"
  },
  {
    path: "/answer",
    name: "Шалгалтад бэлдэх",
    icon: Unarchive,
    component: Test,
    layout: "/admin"
  },
  {
    path: "/test",
    name: "Шалгалт",
    icon: LibraryBooks,
    component: TestAdmin,
    layout: "/admin"
  },
  {
    path: "/exam",
    name: "Шалгалт өгөх",
    icon: LibraryBooks,
    component: Exam,
    layout: "/student"
  },
  {
    path: "/Durem",
    name: "Дүрэм харах",
    icon: Dashboard,
    component: Durem,
    layout: "/student"
  },
  {
    path: "/Tutorial",
    name: "Хичээл үзэх",
    icon: Language,
    component: Tutorial,
    layout: "/student"
  },
  {
    path: "/Tutorial",
    name: "Хичээл",
    icon: Language,
    component: TutorialAdmin,
    layout: "/admin"
  },
  
  {
    path: "/shalgaltad_beldeh",
    name: "Шалгалтад бэлдэх",
    icon: Unarchive,
    component: Test,
    layout: "/student"
  },

];

export default dashboardRoutes;
