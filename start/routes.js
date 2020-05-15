'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store')
Route.post('sessions', 'SessionController.store')

Route.post('passwords', 'ForgotPasswordController.store')
Route.put('passwords', 'ForgotPasswordController.update')

Route.group(() => {
  Route.resource('accounts', 'AccountController').apiOnly()
  Route.resource('accounts.transactions', 'TransactionController').apiOnly()

  Route.get('investments', 'InvestmentController.index')
  Route.post('accounts/:accounts_id/targets/:targets_id/investments', 'InvestmentController.store')
  Route.get('investments/:id', 'InvestmentController.show')
  Route.put('investments/:id', 'InvestmentController.update')
  Route.delete('investments/:id', 'InvestmentController.destroy')

  Route.resource('cards', 'CardController').apiOnly()
  Route.resource('cards.invoices', 'InvoiceController').apiOnly()
  Route.resource('cards.invoices.expenses', 'ExpenseController').apiOnly()

  Route.resource('targets', 'TargetController').apiOnly()
}).middleware(['auth'])
