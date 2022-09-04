
export interface ToDo {
    text: string
}

export interface DoNextData {
    todos: ToDo[]
}

// export class DoData {
//     private static instance: DoData

//     private constructor() { }

//     public static getInstance(): DoData {
//         if (!DoData.instance) {
//             DoData.instance = new DoData()
//         }
//         return DoData.instance
//     }

//     list: ToDo[] = [
//         { text: "Thing1" },
//         { text: "Thing2" },
//     ]

//     setData = (data: ToDo[]) => {
//         this.list = data
//     }

// }



