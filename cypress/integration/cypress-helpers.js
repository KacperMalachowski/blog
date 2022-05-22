
function mockGraphqlRequests(operationMocks) {
  // Make sure requests are mocked before browser window is loaded
  cy.on('window:before:load', win => {
      const originalFunction = win.fetch;
      
      function fetchStub(path, request) {
          if (request && request.body) {
              // Using operation name of the request to look for response mock data
              const { operationName } = JSON.parse(request.body);
              const mockResponse = operationMocks[operationName];
              if (mockResponse) {
                  // If operation mock is found, mock the response
                  return _responseStub(mockResponse);
              }
          }
          
          // If request mock data not found, we do not mock the request
          return originalFunction.apply(this, arguments);
      }
      
      // Mocking all fetch actions that are called with `/graphql` endpoint
      cy.stub(win, 'fetch', fetchStub)
          .withArgs('/graphql')
          .as('graphqlStub');
  });
};

function _responseStub(result) {
  return new Promise(resolve => {
      setTimeout(() => {
          resolve({
              text() {
                  return Promise.resolve(JSON.stringify({ data: result }));
              },
              ok: true,
          });
      }, 100); // Optional timeout if you want for requests to have a small delay
  });
}