import React, { Component } from 'react';
import { } from 'react-native';
import BaseRoute from './BaseRoute';
import Toast from 'react-native-toast-message';

export default function Navigation(params) {
  return (
    <>
      <BaseRoute />
      <Toast />
    </>
  )
}