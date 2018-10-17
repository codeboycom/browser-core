import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { getMessage } from '../../../core/i18n';
import Title from '../partials/Title';
import TapToCopy from '../partials/TapToCopy';
import { elementSideMargins } from '../../styles/CardStyle';

const styles = StyleSheet.create({
  content: {
    marginTop: 10,
    ...elementSideMargins,
  }
});

export default function ({ data }) {
  const Container = data.ez_type ? View : TapToCopy; // copy only calculator answers
  let title = null;
  if (data.ez_type === 'time') {
    title = `${getMessage(data.ez_type)} ${data.location}`;
  }
  const answerToDisplay = data.isRounded ? `≈ ${data.answer}` : `= ${data.answer}`;
  return (
    <Container val={data.answer}>
      {title && <Title title={title} />}
      <View style={styles.content}>
        <View
          accessible={false}
          accessibilityLabel={'calc-answer'}
        >
          <Text style={{ fontSize: 18, color: 'black' }}>{answerToDisplay}</Text>
        </View>
        <View
          accessible={false}
          accessibilityLabel={'calc-expression'}
        >
          <Text style={{ fontSize: 14, color: 'black' }}>{data.expression}</Text>
        </View>
      </View>
    </Container>
  );
}
