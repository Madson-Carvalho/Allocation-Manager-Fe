const getPath = (path, currentPath) => {
    return currentPath.pathname === path;
}

export default getPath;