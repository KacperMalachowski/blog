package main

import (
	"sync"
	"testing"

	"github.com/kacpermalachowski/personal-blog/infra/pkg/mocks"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
	"github.com/stretchr/testify/assert"
)

func Test_createInfrastructure(t *testing.T) {
	err := pulumi.RunErr(func(ctx *pulumi.Context) error {
		infra, err := createInfrastructure(ctx)
		assert.NoError(t, err)

		var wg sync.WaitGroup
		wg.Add(3)

		pulumi.All(infra.website.URN(), infra.website.Website.MainPageSuffix()).ApplyT(func(all []interface{}) error {
			urn := all[0].(pulumi.URN)
			mainPage := all[1].(*string)

			assert.Equalf(t, "index.html", *mainPage, "not index.html as main page for %v", urn)
			wg.Done()
			return nil
		})

		pulumi.All(infra.website.URN(), infra.website.Location).ApplyT(func(all []interface{}) error {
			urn := all[0].(pulumi.URN)
			location := all[1].(string)

			assert.Equalf(t, "EU", location, "website not placed in EU: %v", urn)
			wg.Done()
			return nil
		})

		pulumi.All(infra.website.URN(), infra.website.ForceDestroy).ApplyT(func(all []interface{}) error {
			urn := all[0].(pulumi.URN)
			forceDestroy := all[1].(*bool)

			assert.Truef(t, *forceDestroy, "bucket %v force destroyable", urn)
			wg.Done()
			return nil
		})

		wg.Wait()
		return nil
	}, pulumi.WithMocks("project", "stack", mocks.New(0)))

	assert.NoError(t, err)
}
