document.getElementById("agentForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let agentName = document.getElementById("agentName").value;
    let agentRole = document.getElementById("agentRole").value;
    let agentDescription = document.getElementById("agentDescription").value;

    // Create an agent object
    let agent = {
        name: agentName,
        role: agentRole,
        description: agentDescription,
        tasks: [] // Stores tasks assigned to the agent
    };

    // Display the agent in the list with a button to perform a task
    let agentList = document.getElementById("agentList");
    let li = document.createElement("li");
    li.innerHTML = `${agent.name} - ${agent.role}: ${agent.description}
                    <button onclick="assignTask('${agent.name}')">Assign Task</button>
                    <ul id="${agent.name}-tasks"></ul>`;
    agentList.appendChild(li);

    // Reset form
    document.getElementById("agentForm").reset();

    // Store agent object in memory
    localStorage.setItem(agent.name, JSON.stringify(agent));
});

// Function to assign tasks to agents
function assignTask(agentName) {
    let task = prompt("What task do you want to assign to the agent? (e.g., Respond to Inquiry, Analyze Data)");

    if (task) {
        let agent = JSON.parse(localStorage.getItem(agentName));
        agent.tasks.push(task); // Add task to agent's task list

        // Display tasks assigned to the agent
        let taskList = document.getElementById(`${agentName}-tasks`);
        let taskItem = document.createElement("li");
        taskItem.textContent = task;
        taskList.appendChild(taskItem);

        // Update agent object in memory
        localStorage.setItem(agentName, JSON.stringify(agent));
    }
}