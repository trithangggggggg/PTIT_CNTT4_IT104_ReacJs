export interface Task {
    id : number,
    taskName : string,
    completed : boolean,
    priority :Priority
}

export type Priority = 'Cao' | 'Trung bình' | 'Thấp';


export interface Action {
    type : string,
    payload : Task,

}