export interface IGetAllTodosBody {
  todoId: number;
  newIsDone: boolean;
}

export interface IUpdateTodoBody {
  todoId: number;
  newTask: string;
  newIsDone: boolean;
  newDueDate: Date;
}

export interface ICreateNewTodoBody {
  newTask: string;
  newIsDone: boolean;
  newDueDate: Date;
  newUserId: number;
}

export interface IDeleteTodoBody {
  todoId: number;
}

// Nuevas interfaces para estadísticas
export interface IGetAllStatsBody {
  userId: number;
}

export interface IUpdateStatBody {
  statId: number;
  newValue: number;
}

export interface ICreateNewStatBody {
  userId: number;
  type: string;
  value: number;
}

export interface IDeleteStatBody {
  statId: number;
}