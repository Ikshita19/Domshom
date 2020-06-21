export interface Question {
    _id: number;
    answers: string[];
    length: number;
    text: string;
    correctIndex: number;
    correctAnswer?: number;
    btnColor: string;
}

export interface Quiz {
    _id: string;
    title: string;
    description: string;
    questions: Array<Question>;
    currentQuestion?: Question;
    currentIndex?: number;
}

export interface User {
    name: string;
    email: string;
    phone: number;
}

export interface IMedia {
    _id: string;
    title: string;
    src: string;
    poster: string;
    type: string;
    completed: boolean;
  }

export interface Section{
    _id: string,
    title: string,
    videos: Array<IMedia>;
}  

export interface VideoLibrary{
    _id: string
    title: string,
    description: string;
    price: number,
    discount: number,
    sections: Array<Section>;
}

