import { createContext, useContext } from "react";

const KanbanContext = createContext(undefined)


export function useKanbanContext() {

    const data = useContext(KanbanContext)
    if(data === undefined){
        throw new Error()
    }else{
        return data
    }

}

export default KanbanContext;