import React from 'react';
import { Button } from '@hkx/design';

export default () => (
  <div style={{ display: 'flex', gap: 8 }}>
    <Button disabled={true}>Primary</Button>
    <Button disabled={false}>Primary</Button>
  </div>
);
