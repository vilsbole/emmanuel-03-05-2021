### Technical Questions

1. What would you add to your solution if you had more time?
   With more time I would:
   i. Add features:

   - depth visualisation
   - highlight updated price
   - dynamic pair selection

   ii. Increase stability

   - test side-effects (most likely with sagas)
   - test component rendering
   - move websocket connection to webworker
   - improve selector memonization

2. What would you have done differently if you knew this page was going to get thousands of views
   per second vs per week?
   Depending on the current priorities, I would likely setup anonymous client side application monitoring to identify errors. Benchmark web vitals and performance to find bottlenecks, discuss asset caching with dev ops, and discuss potential optimisations (SSE?, SharedWorkers?) with the backend team to see how to reduce server load.

3. What was the most useful feature that was added to the latest version of your chosen language?
   Please include a snippet of code that shows how you've used it.

   Since I'm a big fan of destructuring, the [ability](https://devblogs.microsoft.com/typescript/announcing-typescript-4-2/#unused-destructured) to mark destructered variables as unused removes friction with typescript.

   ```
    const selectSize = ([_p, s]) => s
   ```

4. How would you track down a performance issue in production? Have you ever had to do this?
   I would seek to reproduce the issue on a production and identify the issue using browser devtools and react devtools.

   If I cannot reproduce, I would research client side performance monitoring and compare the different services available such as [log rocket](https://logrocket.com/for/front-end-application-monitoring/), [sentry](https://sentry.io/welcome/) and [datadog](https://www.datadoghq.com/).

   Till today, I've worked on projects where performance bottlenecks where solved by low hanging optimisations such as identifying blocking network requests, or the loading of large assets/file.

5. Can you describe common security concerns to consider for a frontend developer?
   There are numerous security concerns for a frontend developer. To name only a few, we must escape any user-provided input to avoid XSS attacks, correctly set link options when opening links to cross-origin destinations and be wary of third party scripts or supply-chain attacks.

6. How would you improve the Kraken API that you just used?
   I would investigate the possibility for the API to return an ordered window of orders which includes the totals.
