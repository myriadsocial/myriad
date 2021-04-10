import { useState } from 'react';

import { useExperience as baseUseExperience, ExperienceActionType } from './experience.context';

import Axios from 'axios';
import { omit } from 'lodash';
import { Experience, People, Tag } from 'src/interfaces/experience';

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://34.101.124.163:3000'
});

export const useExperience = (userId: string) => {
  const { state, dispatch } = baseUseExperience();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [params, setParams] = useState({
    offset: 0,
    limit: 10,
    include: ['user']
  });

  const experiencePath = userId ? '/experiences' : `/users/${userId}/experiences`;

  const load = async (type: ExperienceActionType = ExperienceActionType.INIT_EXPERIENCE) => {
    setLoading(true);

    try {
      const { data } = await axios.request<Experience[]>({
        url: experiencePath,
        method: 'GET',
        params: {
          filter: params
        }
      });

      dispatch({
        type: ExperienceActionType.INIT_EXPERIENCE,
        experiences: data
      });
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreExperience = async () => {
    const filter = {
      ...params,
      offset: (params.offset + 1) * params.limit
    };

    setLoading(true);

    try {
      const { data } = await axios({
        url: `/users/${userId}/experiences`,
        method: 'GET',
        params: {
          filter
        }
      });

      setParams(filter);

      if (data.length > 0) {
        dispatch({
          type: ExperienceActionType.SHOW_MORE_EXPERIENCE,
          experiences: data
        });
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const selectExperience = async (id: string) => {
    const experience = state.experiences.find(item => item.id === id);

    if (experience) {
      dispatch({
        type: ExperienceActionType.SELECT_EXPERIENCE,
        experience
      });
    }
  };

  const editExperience = async (data: Experience, tags: Tag[], people: People[]) => {
    dispatch({
      type: ExperienceActionType.EDIT_EXPERIENCE,
      experience_id: data.id,
      experience: {
        ...data,
        tags,
        people
      }
    });
  };

  const storeExperience = async (experience: Experience) => {
    const { data } = await axios({
      url: `users/${userId}/experiences`,
      method: 'POST',
      data: omit(experience, ['id', 'user', 'description', 'layout'])
    });

    dispatch({
      type: ExperienceActionType.ADD_EXPERIENCE,
      payload: data
    });

    selectExperience(data.id);
  };

  const storeExperiences = async (experiences: Experience[]) => {
    for (const experience of experiences) {
      await axios({
        url: `users/${userId}/experiences`,
        method: 'POST',
        data: {
          ...omit(experience, ['id', 'user']),
          userId: userId
        }
      });
    }

    load();
  };

  const updateExperience = async (experience: Experience) => {
    await axios.request({
      url: `/experiences/${experience.id}`,
      method: 'PATCH',
      data: {
        people: experience.people,
        tags: experience.tags
      }
    });

    dispatch({
      type: ExperienceActionType.UPDATE_SELECTED_EXPERIENCE,
      experience
    });
  };

  const removeExperience = async (id: string) => {
    await axios({
      url: `/experiences/${id}`,
      method: 'DELETE'
    });

    dispatch({
      type: ExperienceActionType.REMOVE_EXPERIENCE,
      experience_id: id
    });
  };

  const searchExperience = async (query: string) => {
    const { data } = await axios({
      url: '/experiences',
      method: 'GET',
      params: {
        filter: {
          include: ['user'],
          offset: 0,
          limit: 100,
          skip: 0,
          where: {
            name: {
              like: `.*${query}*`,
              options: 'i'
            },
            id: {
              nin: state.experiences.map(i => i.id)
            }
          }
        }
      }
    });

    dispatch({
      type: ExperienceActionType.SEARCH_EXPERIENCE,
      experiences: data
    });
  };

  const prependExperience = (experience: Experience) => {
    dispatch({
      type: ExperienceActionType.ADD_EXPERIENCE,
      payload: experience
    });

    selectExperience(experience.id);
  };

  return {
    error,
    loading,
    experiences: state.experiences,
    selected: state.selected,
    edit: state.edit,
    searched: state.searched,
    loadInitExperience: load,
    loadMoreExperience,
    storeExperience,
    storeExperiences,
    updateExperience,
    searchExperience,
    selectExperience,
    editExperience,
    removeExperience,
    prependExperience
  };
};
