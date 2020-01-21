import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import ServiceActions from './actions'
import * as sessionActions from 'store/auth/actions'
import { getActionStubbed } from 'testHelper'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Service Actions', () => {
  const serviceActions = new ServiceActions()

  describe('Session Actions - Log In', () => {
    describe('WHEN executed: handleServiceError() with error 401', () => {
      describe('WHEN calling for login', () => {
        let serviceErrorAction
        let error
        beforeAll(() => {
          error = {
            code: 401,
            message: 'Unauthorized',
            details: {
              method: 'POST',
              url: 'auth/login',
              fullUrl: null,
              requireAuth: false
            },
            payload: {}
          }
          serviceErrorAction = getActionStubbed(false, serviceActions, 'serviceError')
          const store = mockStore({
            auth: {
              loggingOut: false
            }
          })

          store.dispatch(serviceActions.handleServiceError(error))
        })

        it('should be able to call serviceError Action', () => {
          expect(serviceErrorAction).toHaveBeenCalled()
        })

        afterAll(() => {
          serviceErrorAction.restore()
        })
      })

      describe('WHEN calling for other urls', () => {
        let logoutAction
        let serviceErrorAction
        let error
        beforeAll(() => {
          logoutAction = getActionStubbed(false, sessionActions, 'logOut')
          serviceErrorAction = getActionStubbed(false, serviceActions, 'serviceError')
          error = {
            code: 401,
            message: 'Unauthorized',
            details: {
              method: 'POST',
              url: 'dairies',
              fullUrl: null,
              requireAuth: false
            },
            payload: {}
          }

          const store = mockStore({
            auth: {
              loggingOut: false
            }
          })

          // Act & assert.
          store.dispatch(serviceActions.handleServiceError(error))
        })

        it('should be able to dispatch serviceError and logOut action', () => {
          expect(serviceErrorAction).toHaveBeenCalledWith(error)
          expect(logoutAction).toHaveBeenCalled()
        })

        afterAll(() => {
          serviceErrorAction.restore()
          logoutAction.restore()
        })
      })
    })

    describe('WHEN executed: handleServiceError() with error 500', () => {
      let serviceErrorAction
      let error
      beforeAll(() => {
        serviceErrorAction = getActionStubbed(false, serviceActions, 'serviceError')
        error = {
          code: 500,
          message: 'Internal server error',
          details: {
            method: 'GET',
            url: 'dairies',
            fullUrl: 'dairies?page=1&pageSize=99',
            requireAuth: false
          },
          payload: {}
        }

        const store = mockStore({})

        // Act & assert.
        store.dispatch(serviceActions.handleServiceError(error))
      })

      it('should be able to call serviceError Action', () => {
        expect(serviceErrorAction).toHaveBeenCalledWith(error)
      })

      afterAll(() => {
        serviceErrorAction.restore()
      })
    })
  })
})
