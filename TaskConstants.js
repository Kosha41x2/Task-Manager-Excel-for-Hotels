const taskList = new TaskList([]);
taskList.push(new Task("Limpiar áreas comunes", 60, 3, "all"))
        .push(new Task("Limpiar terraza", 10, 2, [3, 6]))
        .push(new Task("Limpiar patios", 20, 2, [4]))
        .push(new Task("Limpiar oficina", 10, 2, [6]))
        .push(new Task("Regar plantas", 15, 4, [3]))
        .push(new Task("Limpiar habitación", 30, 5, "custom"));