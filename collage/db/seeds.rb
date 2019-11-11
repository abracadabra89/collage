# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Board.destroy_all
Comment.destroy_all
Image.destroy_all

User.create([
    {username: 'user1'},
    {username: 'user2'},
    {username: 'user3'},
    {username: 'user4'},
    {username: 'user5'}
]);

Board.create([
    {user_id: User.first.id, likes: 5, title: 'Winter'},
    {user_id: User.second.id, likes: 2, title: 'Summer'},
    {user_id: User.third.id, likes: 0, title: 'Phones'},
    {user_id: User.fourth.id, likes: 100, title: 'Coffee'},
    {user_id: User.fifth.id, likes: 25, title:'Fashion'}
])

Comment.create([
    {board_id: Board.first.id, description: "Lots of things"},
    {board_id: Board.second.id, description: "I love it"},
    {board_id: Board.third.id, description: "It's great"},
    {board_id: Board.fourth.id, description: "Wow, it sucks"},
    {board_id: Board.fifth.id, description: "Never make another board again"}
])

Image.create([
    {board_id: Board.first.id, title: "Trees and a River", description: "Lots of trees and water", link: "https://images.unsplash.com/photo-1527489377706-5bf97e608852?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2027&q=80"},
    {board_id: Board.second.id, title: "Trees and a River", description: "Lots of trees and water", link: "https://images.unsplash.com/photo-1527489377706-5bf97e608852?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2027&q=80"},
    {board_id: Board.third.id, title: "Trees and a River", description: "Lots of trees and water", link: "https://images.unsplash.com/photo-1527489377706-5bf97e608852?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2027&q=80"},
    {board_id: Board.fourth.id, title: "Trees and a River", description: "Lots of trees and water", link: "https://images.unsplash.com/photo-1527489377706-5bf97e608852?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2027&q=80"},
    {board_id: Board.fifth.id, title: "Trees and a River", description: "Lots of trees and water", link: "https://images.unsplash.com/photo-1527489377706-5bf97e608852?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2027&q=80"}
])