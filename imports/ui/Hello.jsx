import React, { useState } from 'react';
import { Button, Card, Typography } from 'antd';

const { Text } = Typography;

export const Hello = () => {
  const [counter, setCounter] = useState(0);

  const increment = () => {
    setCounter(counter + 1);
  };

  return (
    <Card style={{ marginBottom: '20px' }}>
      <Button type="primary" onClick={increment}>
        Click Me
      </Button>
      <Text style={{ marginLeft: '16px' }}>
        You've pressed the button {counter} times.
      </Text>
    </Card>
  );
};
