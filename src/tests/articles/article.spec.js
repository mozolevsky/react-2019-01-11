import React from 'react'
import {mount} from 'enzyme'
import mockedArticles from '../../fixtures'
import Article from '../../components/articles/article'

describe('Article', () => {
    it('is closed', done => {
        const wrapper = mount(
            <Article article={mockedArticles[0]} isOpen={true} toggleArticle={() => done()}/>
        )
        wrapper.find('button.test--article__btn').simulate('click')
    })
})
