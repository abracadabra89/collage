# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'

# User.destroy_all
# Board.destroy_all
# Comment.destroy_all
# Image.destroy_all

# User.create([
#     {username: 'user1'},
#     {username: 'user2'},
#     {username: 'user3'},
#     {username: 'user4'},
#     {username: 'user5'}
# ]);

# Board.create([
#     {user_id: 1, likes: 5},
#     {user_id: 2, likes: 2},
#     {user_id: 3, likes: 0},
#     {user_id: 4, likes: 100},
#     {user_id: 5, likes: 25}
# ])

# Comment.create([
#     {board_id: 1, description: "Lots of things"},
#     {board_id: 2, description: "I love it"},
#     {board_id: 3, description: "It's great"},
#     {board_id: 4, description: "Wow, it sucks"},
#     {board_id: 5, description: "Never make another board again"}
# ])

Image.create([
    {board_id: 1, title: "Trees and a River", description: "Lots of trees and water", link: "https://images.unsplash.com/photo-1527489377706-5bf97e608852?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2027&q=80"},
    {board_id: 2, title: "Trees and a River", description: "Lots of trees and water", link: "https://images.unsplash.com/photo-1527489377706-5bf97e608852?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2027&q=80"},
    {board_id: 3, title: "Trees and a River", description: "Lots of trees and water", link: "https://images.unsplash.com/photo-1527489377706-5bf97e608852?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2027&q=80"},
    {board_id: 4, title: "Trees and a River", description: "Lots of trees and water", link: "https://images.unsplash.com/photo-1527489377706-5bf97e608852?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2027&q=80"},
    {board_id: 5, title: "Trees and a River", description: "Lots of trees and water", link: "https://images.unsplash.com/photo-1527489377706-5bf97e608852?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2027&q=80"}
])