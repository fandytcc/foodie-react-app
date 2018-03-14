import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import RestaurantPage from './RestaurantPage'
import RecipeEditor from '../../containers/recipes/RecipeEditor'
import RaisedButton from 'material-ui/RaisedButton'


describe('<RestaurantPage />', () => {
  const wrapper = shallow(<RestaurantPage />)
  it('renders one <RecipeEditor /> component', () => {
    expect((wrapper).find(RecipeEditor)).to.have.length(1)
  })

  it('renders one <RaisedButton /> component', () => {
  const wrapper = shallow(<RestaurantPage />)
  expect((wrapper).find(RaisedButton)).toBePresent();
  })

  it('simulate click events', () => {
    const onClick = sinon.spy()
    const wrapper = shallow(<RaisedButton onClick={this.getRandomRecipe.bind(this)} />)
    wrapper.find('button').simulate('click')
    expect(onClick).to.have.property('callCount', 1)
  })

})
