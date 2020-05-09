import gql from 'graphql-tag';

export const LOGIN_QUERY = gql`
  mutation login($email: String! $password: String!) {
    login(
      email: $email
      password: $password
    ) {
      _id
      exp
      email
      token
      type
    }
  }
`;

export const ME = gql`
  query me {
    me {
      _id
      email
      phone
      avatar
    }
  }
`;

export const GET_USERS = gql`
  query {
    users {
      _id
      username
      type
      email
      phone
      isBanned
    }
  }
`;
export const BAN_USERS = gql`
  mutation banUser($userId: String!){
    banUser(userId:$userId){
      _id
    }
  }
`;


export const CREATE_USERS = gql`
  mutation createUser(
  $username:String!,
  $phone: Int!, 
  $avatar:String!, 
  $email:String!, 
  $type: String!,
  $password: String!
){
  createUser(userInput:{
    username: $username
    phone: $phone
    avatar: $avatar 
    email: $email
    type: $type
    password: $password
  }){
    username
    phone
    avatar
    email
    type
  }
}
`;

export const GET_POSTS = gql`
  query{posts{
    _id
    title
    description
    image
    createdDate
    author{
      username
    }
  }}
`;


export const DELETE_POST = gql`
  mutation removePost($postId: String!){
    removePost(postId:$postId){
      _id
    }
  }
`;


export const CREATE_POST = gql`
  mutation addPost($postInput: PostInput!){
  addPost(post:$postInput){
    _id
    title
    description
    image
    createdDate
    author{
      username
    }
  }
}
`;



export const GET_TUTORIALS = gql`
  query{
  tutorials{
    _id
    title
    description
    video
    image
    comment
  }
}
`;

export const UPDATE_TUTORIALS = gql`
  mutation addTutorial($tutorialInput: TutorialInput!){
  addTutorial(tutorial:$tutorialInput){
    _id
    title
    description
    video
    image
    comment
  }
}
`;


export const DELETE_TUTORIALS = gql`
  mutation removeTutorial($tutorialId: String!){
    removeTutorial(tutorialId:$tutorialId){
      _id
    }
  }
`;


export const CREATE_TUTORIALS = gql`
  mutation addTutorial($tutorialInput: TutorialInput!){
  addTutorial(tutorial:$tutorialInput){
    _id
    title
    description
    video
    image
  }
}
`;


export const GET_COURSES = gql`
  query {
    courses {
      _id
      name
      director {
        username
        phone
      }
      email
    }
  }
`;


export const DELETE_COURSE = gql`
  mutation deleteCourse($courseId: String!){
    deleteCourse(courseId:$courseId){
      _id
    }
  }
`;


export const CREATE_COURSE = gql`
  mutation createCourse($course: CourseInput!){
    createCourse(course:$course){
      name
      director{
        username
        _id
      }
    }
  }
`;

export const CREATE_TEST = gql`
  mutation addTest($testInput: TestInput!){
  addTest(test: $testInput){
    _id
    description
    image
    inputAnswer{
      content
      isCorrect
    }
  }
}
`;
export const GET_TESTS = gql`
  query{
    tests{
      _id
      description
      image
      hint
      inputAnswer{
      isCorrect
        image
        content
      }
    }
}
`;


export const DELETE_TEST = gql`
  mutation removeTest($testId: String!){
    removeTest(testId:$testId){
      _id
    }
  }
`;


export const CREATE_DUREMCATEGORY = gql`
  mutation createDuremCategory($categoryName: String!){
    createDuremCategory(name: $categoryName){ 
      _id
      name
}
  }
`;


export const CREATE_DUREM = gql`
  mutation addDurem($duremInput: DuremInput!, $categoryId: String!){
  addDurem(durem: $duremInput, duremCategoryId: $categoryId){ 
		_id
    category{
      name
    }
    title
    description
    image
  }
}
`;
export const GET_DUREM = gql`
  query{
    duremcategorys{
      _id
      name
      durmuud{
        _id
        title
        description
        image
      }
    }
}
`;


export const DELETE_DUREM = gql`
  mutation removeDurem($duremId: String!){
    removeDurem(duremId:$duremId){
      _id
    }
  }
`;

export const CREATE_SCHEDULE = gql`
  mutation addCalendarSchedule($date:String!, $name: String!){
    addCalendarSchedule(event: {
      date:$date,
      name:$name
    }){
      _id
      startDate
      endDate
      name
      teacher{
        username
      }
    }
  }
`;

export const DELETE_SCHEDULE = gql`
  mutation removeCalendarSchedule($id:String!){
    removeCalendarSchedule(scheduleId: $id){
      _id
    }
  }
`;

export const GET_SCHEDULES = gql`
query{
  schedules{
    _id
    name
    startDate
    endDate
    teacher{
      username
    }
  }
}
`;
