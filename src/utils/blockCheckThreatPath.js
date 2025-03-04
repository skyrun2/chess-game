
function blockCheckThreatPath(blocker,blockerPaths,threatPath){    
    let blockingPath = {};
    for (const path in threatPath) {
        if (blockerPaths[path]) {
            blockingPath[path] = blockerPaths[path];
        }
    }
    return blockingPath;
    
}
export default blockCheckThreatPath;