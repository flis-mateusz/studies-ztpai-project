export const testApi = async () => {
    await fetch('/api/get')
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            return {data}
        });
    return {data: 1}
}