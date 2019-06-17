# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
oli = User.create(username: 'oli', password: 'mooo')
ranjit = User.create(username: 'ranjit', password: 'plant')
pete = User.create(username: 'pete', password: 'codecode')

Usecat.create(user_id: 1, category_id: 103)
Usecat.create(user_id: 1, category_id: 113)
Usecat.create(user_id: 1, category_id: 105)
Usecat.create(user_id: 2, category_id: 107)
Usecat.create(user_id: 2, category_id: 103)
Usecat.create(user_id: 2, category_id: 101)
Usecat.create(user_id: 3, category_id: 102)
Usecat.create(user_id: 3, category_id: 109)
Usecat.create(user_id: 3, category_id: 110)

